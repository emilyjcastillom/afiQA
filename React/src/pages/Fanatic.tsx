import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import CarouselCard from "../components/ui/CarouselCard";
import Dialog from "../components/ui/Dialog";
import { useFanaticRiddles, useSubmitFanaticAnswer } from "../hooks/useFanatic";

function Fanatic() {
    const { riddles, loading, error } = useFanaticRiddles();
    const { answer, loading: submitting, error: submitError } = useSubmitFanaticAnswer();

    const [guess, setGuess] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [submitResult, setSubmitResult] = useState<any>(null);

    const handleGuess = async () => {
        if (!guess.trim()) return;
        const result = await answer(guess);
        setSubmitResult(result);
        setDialogOpen(true);
    };
    
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
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                />

                <Button 
                    variant="secondary"
                    className="font-anton text-2xl py-3"
                    onClick={handleGuess}
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Guess!"}
                </Button>
            </div>

            {/* Result Dialog */}
            <Dialog isOpen={dialogOpen}>
                <div className="flex flex-col gap-4 text-center items-center">
                    <h2 className={`text-3xl font-anton ${submitError ? 'text-red-500' : submitResult?.correct ? 'text-green-500' : 'text-primary'}`}>
                        {submitError ? "Error" : submitResult?.message || "Result"}
                    </h2>
                    <p className="font-lato text-lg">
                        {submitError 
                            ? submitError.message 
                            : submitResult 
                                ? JSON.stringify(submitResult) 
                                : "No result"}
                    </p>
                    <Button 
                        variant="primary" 
                        onClick={() => setDialogOpen(false)}
                        className="w-full mt-2"
                    >
                        Close
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}

export default Fanatic;