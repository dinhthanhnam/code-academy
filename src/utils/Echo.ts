import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from "axios";

// Chỉ khởi tạo Echo ở client-side
// @ts-ignore
let echo: Echo | null = null;

if (typeof window !== 'undefined') {
    window.Pusher = Pusher;
    echo = new Echo({
        broadcaster: 'reverb',
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
        wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
        wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
        wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
        // scheme: process.env.NEXT_PUBLIC_REVERB_SCHEME,
        scheme: 'http',
        enabledTransports: ['ws'],
        forceTLS: false,
        disableStats: true,
        path: '',
        authEndpoint: 'http://localhost:8000/broadcasting/auth',
        authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    axios.post(
                        'http://localhost:8000/broadcasting/auth',
                        {
                            socket_id: socketId,
                            channel_name: channel.name
                        },
                        {
                            withCredentials: true, // gửi cookie laravel_session
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }
                    ).then(response => {
                        callback(false, response.data);
                    }).catch(error => {
                        console.error('[Broadcasting Auth Error]', error);
                        callback(true, error);
                    });
                }
            };
        }
    });
}

export default echo;