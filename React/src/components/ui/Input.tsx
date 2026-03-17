interface InputProps {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

function Input({ placeholder, className, value, onChange, disabled }: InputProps) {
    return (
        <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border-4 border-secondary focus:border-primary focus:outline-none rounded-2xl disabled:opacity-50 p-4 font-lato transition-colors ${className ?? ""}`}
        disabled={disabled}
        />
    );
}

export default Input;