export default function BaseModal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4'
            onClick={onClose}
        >
            <div
                className='bg-secondary rounded-md max-w-[500px] w-[500px]'
                onClick={(event) => event.stopPropagation()}
            >
                { children }
            </div>
        </div>
    );
}
