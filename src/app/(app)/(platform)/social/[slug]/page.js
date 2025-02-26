export default async function SocialPage({ params }) {
    const { slug } = await params; // ⬅️ Phải await params

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Social: {slug}</h1>
            <p>Đây là trang mạng xã hội của {slug}</p>
        </div>
    );
}
