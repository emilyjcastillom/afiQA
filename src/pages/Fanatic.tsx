import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import CarouselCard from "../components/ui/CarouselCard";
import { useFanaticRiddles } from "../hooks/useFanatic";

function Fanatic() {
    const { riddles, loading, error } = useFanaticRiddles();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-anton animate-pulse">Loading clues...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-6">
                <p className="text-xl text-red-500 font-anton text-center">
                    Oops! Something went wrong fetching the clues.
                </p>
            </div>
        );
    }

    const carouselItems = riddles
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(r => r.riddle);

    return (
        <div className="flex flex-col gap-4 min-h-screen p-6 max-w-2xl mx-auto items-center">
            {/* Carousel */}
            <div className="flex-1 flex items-center justify-center w-full">
                <CarouselCard items={carouselItems.length > 0 ? carouselItems : ["No clues available."]} />
            </div>

            {/* Guess Section */}
            <div className="w-full flex flex-col gap-4 pb-4">
                <Input 
                    placeholder="Your guess here!"
                />

                <Button 
                    variant="secondary"
                    className="font-anton text-2xl py-3"
                    onClick={() => {}}
                >
                    Guess!
                </Button>
            </div>
        </div>
    );
}

export default Fanatic;