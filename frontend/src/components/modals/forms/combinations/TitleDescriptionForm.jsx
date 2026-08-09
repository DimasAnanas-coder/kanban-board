import TextInput from '../TextInput';
import TextareaInput from '../TextareaInput';

export default function TitleDescriptionForm({
    title,
    setTitle,
    description,
    setDescription,
    onSubmit,
    titleError = false,
    titlePlaceholder = 'Введите название ...',
    descriptionPlaceholder = 'Введите описание (необязательно) ...',
    className = '',
}) {
    return (
        <form onSubmit={onSubmit}>
            <div className={`space-y-4 ${className}`}>
                <TextInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={titlePlaceholder}
                    required
                    error={titleError}
                />

                <TextareaInput
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={descriptionPlaceholder}
                />
            </div>
        </form>
    );
}
