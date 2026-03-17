import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import CarouselCard from "../components/ui/CarouselCard";
import Dialog from "../components/ui/Dialog";
import { 
    useFanaticRiddles, 
    useSubmitFanaticAnswer, 
    useFanaticTries, 
    useFanaticBestTry 
} from "../hooks/useFanatic";

function Fanatic() {
    const { riddles, loading, error } = useFanaticRiddles();
    const { answer, loading: submitting, error: submitError } = useSubmitFanaticAnswer();
    const { triesInfo, loading: triesLoading, error: triesError, refreshTriesInfo } = useFanaticTries();
    const { bestTry, loading: bestTryLoading, error: bestTryError, refreshBestTry } = useFanaticBestTry();

    const [guess, setGuess] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [submitResult, setSubmitResult] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState<string | null>(null);

    useEffect(() => {
        if (!triesInfo?.next_try_date) {
            setTimeLeft(null);
            return;
        }

        const targetDate = new Date(triesInfo.next_try_date).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                setTimeLeft(null);
                return;
            }

            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft(
                `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
        };

        // Run immediately, then every second
        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, [triesInfo?.next_try_date]);

    const handleGuess = async () => {
        if (!guess.trim()) return;
        const result = await answer(guess);
        setSubmitResult(result);
        setDialogOpen(true);
        refreshTriesInfo();
    };
    
    if (loading || triesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-anton animate-pulse">Loading...</p>
            </div>
        );
    }

    if (error || triesError) {
        return (
            <div className="flex items-center justify-center min-h-screen p-6">
                <p className="text-xl text-red-500 font-anton text-center">
                    Oops! Something went wrong fetching the data.
                </p>
            </div>
        );
    }

    const carouselItems = riddles
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(r => r.riddle);
        
    const hasNextTryDate = !!triesInfo?.next_try_date && timeLeft !== null;
    const isOutOfTries = triesInfo?.remaining_tries_game === 0 || triesInfo?.remaining_tries_today === 0;

    return (
        <>
        {/* Header section with Tries Info */}
            <div className="w-full flex justify-between items-center px-10 py-4">
                <div className="flex items-center gap-3">
                    <span className="font-anton text-5xl text-primary">{bestTry?.highest_similarity ?? 0}%</span>
                    <span className="font-lato text-sm text-black">Best<br />Try</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-anton text-5xl text-primary">{triesInfo?.remaining_tries_game ?? 0}</span>
                    <span className="font-lato text-sm text-black">Attempts<br />Remaining</span>
                </div>
            </div>
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
                    disabled={submitting || hasNextTryDate || isOutOfTries}
                >
                    {hasNextTryDate ? `Next try in: ${timeLeft}` : isOutOfTries ? "No Tries Left" : submitting ? "Submitting..." : "Guess!"}
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
        </>
    );
}

export default Fanatic;