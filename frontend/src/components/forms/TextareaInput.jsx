import { textFieldClassName } from './config';

export default function TextareaInput({
    value,
    onChange,
    placeholder,
    rows = 3,
    autoFocus = false,
    required = false,
    className = '',
    ...props
}) {
    return (
        <textarea
            type="text"
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            placeholder={placeholder}
            rows={rows}
            className={`${textFieldClassName}
                ${className}`}
            {...props}
        />
    );
}
