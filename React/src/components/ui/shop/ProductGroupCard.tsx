interface ProductGroupCardProps {
    title: string;
    description: string;
    imageUrl: string;
    onClick: () => void;
}

export function ProductGroupCard({ title, description, imageUrl, onClick }: ProductGroupCardProps) {
    return (
      <button onClick={onClick} className="flex flex-col justify-between text-start p-4">
        <img src={imageUrl} alt={title} className="w-full h-90 md:h-120 object-cover mb-4 rounded" />
        <div className="flex flex-col">
          <h3 className="text-2xl md:text-3xl font-anton font-semibold">{title}</h3>
          <p className="text-md md:text-lg font-lato">{description}</p>
        </div>
      </button>
    );
}