interface CardProps {
    children: React.ReactNode;
    className?: string;
}

function Card({ children, className }: CardProps) {
    return (
        <div className={`border-4 border-secondary rounded-2xl p-4 w-fit ${className ?? ""}`}>
            {children}
        </div>
    );
}

export default Card;