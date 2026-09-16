import { errorStyle, textFieldClassName } from './config';

export default function TextInput({
    value,
    onChange,
    placeholder,
    autoFocus = true,
    required = false,
    error = false,
    className = '',
    ...props
}) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            placeholder={placeholder}
            className={`${textFieldClassName}
                ${error ? errorStyle : ''} 
                ${className}`}
            {...props}
        />
    );
}
