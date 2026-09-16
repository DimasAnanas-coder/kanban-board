import Button from '../Button';

export default function FormActions({
    onCancel,
    onSubmit,
    isSubmitting = false,
    cancelText = 'Отменить',
    submitText = 'Сохранить',
    cancelColor = 'error',
    submitColor = 'ok',
    submitDisabled = false,
    className = '',
}) {
    return (
        <div className={`flex justify-between gap-4 ${className}`}>
            <Button
                color={cancelColor}
                onClick={onCancel}
                disabled={isSubmitting}
            >
                {cancelText}
            </Button>
            <Button
                color={submitColor}
                onClick={onSubmit}
                disabled={isSubmitting || submitDisabled}
            >
                {isSubmitting ? 'Сохранение...' : submitText}
            </Button>
        </div>
    );
}
