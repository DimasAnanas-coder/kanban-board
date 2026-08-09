export default function BaseModal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
            onClick={onClose}
        >
            <div
                className='bg-secondary rounded-md '
                onClick={(event) => event.stopPropagation()}
            >
                { children }
            </div>
        </div>
    );
}
