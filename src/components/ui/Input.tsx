interface InputProps {
    placeholder?: string;
    className?: string;
}

function Input({ placeholder, className }: InputProps) {
    return (
        <input type="text" placeholder={placeholder} className={`border-4 border-secondary rounded-2xl p-4 ${className ?? ""}`} />
    );
}

export default Input;