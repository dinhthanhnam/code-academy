export default function ManagementContainer({children}) {
    return (
        <div className={`management-container border-secondary w-full h-full p-2 overflow-auto`}>
            {children}
        </div>
    );
}