export default function AuthenticationForm() {
    return (
        <div className="container bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto md:ml-auto md:mr-20">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Đăng nhập
            </h2>
            <form className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}
