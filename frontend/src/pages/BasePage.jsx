export default function BasePage({ children }) {
    return (
        <div className="bg-primary">
            <div className='ml-6 mr-6'>
                { children }
            </div>
        </div>
    );
};
