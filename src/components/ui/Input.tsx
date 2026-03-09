interface InputProps {
    placeholder?: string;
    className?: string;
}

function Input({ placeholder, className }: InputProps) {
    return (
        <input
        type="text"
        placeholder={placeholder}
        className={`border-4 border-secondary focus:border-primary focus:outline-none rounded-2xl p-4 font-lato transition-colors ${className ?? ""}`}
        />
    );
}

export default Input;