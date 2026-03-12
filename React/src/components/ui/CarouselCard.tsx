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
        <div className={`relative border-4 border-secondary rounded-[2rem] p-6 md:p-10 flex flex-col items-center justify-between w-full mx-auto overflow-hidden ${className ?? ""}`}>
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory w-full scroll-smooth no-scrollbar mb-6 md:mb-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0 w-full snap-center snap-always flex items-center justify-center text-center px-4 md:px-10 min-h-[250px]"
                    >
                        <div className="text-xl md:text-2xl font-lato font-normal leading-snug text-text max-w-lg select-none">
                            {item}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Dots */}
            <div className="flex gap-2 justify-center items-center">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === activeIndex 
                                ? 'w-1.85 h-1.85 bg-secondary scale-125' 
                                : 'w-1.5 h-1.5 bg-[#D9D9D9]'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselCard;
