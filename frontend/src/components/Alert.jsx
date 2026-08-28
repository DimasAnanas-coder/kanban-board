export default function Alert({ text }) {
    return (
        <div
            className='fixed inset-0 flex items-end justify-end p-10 z-50 pointer-events-none'
        >
            <div
                className='bg-thirdary/50 rounded-md px-6 py-2 ring-accent ring-1 text-text'
            >
                <p>
                    {text}
                </p>
            </div>
        </div>
    );
}
