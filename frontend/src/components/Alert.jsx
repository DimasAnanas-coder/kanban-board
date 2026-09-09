import { ALERT_COLORS } from '../config';


export default function Alert({
    text,
    color='accent',
}) {
    if (!(color in ALERT_COLORS)){
        throw new Error(`Недопустимое значение параметра color - ${color}`);
    }

    return (
        <div
            className='fixed inset-0 flex mt-10 items-start justify-center p-10 z-50 pointer-events-none'
        >
            <div
                className={`bg-thirdary/50 rounded-md px-6 py-2 ${ALERT_COLORS[color]} ring-1 text-text`}
            >
                <p>
                    {text}
                </p>
            </div>
        </div>
    );
}
