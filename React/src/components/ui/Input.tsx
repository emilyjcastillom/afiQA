interface InputProps {
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder, className, value, onChange }: InputProps) {
    return (
        <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border-4 border-secondary focus:border-primary focus:outline-none rounded-2xl p-4 font-lato transition-colors ${className ?? ""}`}
        />
    );
}

export default Input;