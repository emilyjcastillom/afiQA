import React, { useRef, useState } from 'react';

interface CarouselCardProps {
    items: React.ReactNode[];
    className?: string;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ items, className }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        }
    };

    return (
        <div className={`relative border-4 border-secondary rounded-[3rem] p-10 flex flex-col items-center justify-between max-w-2xl mx-auto ${className ?? ""}`}>
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory w-full scroll-smooth no-scrollbar mb-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0 w-full snap-center snap-always flex items-center justify-center text-center px-2 md:px-10 min-h-[200px]"
                    >
                        <div className="text-2xl font-lato font-normal leading-snug text-text max-w-lg select-none">
                            {item}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Dots */}
            <div className="flex gap-3 justify-center items-center">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeIndex 
                                ? 'bg-secondary scale-125' 
                                : 'bg-[#D9D9D9]'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselCard;
