import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import CarouselCard from "../components/ui/CarouselCard";

function Fanatic() {
    return (
        <div className="p-10 space-y-10">
            <div className="flex flex-col gap-4">
                <Button variant="primary" onClick={() => { }}>Fanatic</Button>
                <Button variant="primary" disabled={true} onClick={() => { }}>Fanatic</Button>
                <Button variant="secondary" onClick={() => { }}>Fanatic</Button>
                <Button variant="secondary" disabled={true} onClick={() => { }}>Fanatic</Button>
                <Button variant="destructive" onClick={() => { }}>Fanatic</Button>
                <Button variant="destructive" disabled={true} onClick={() => { }}>Fanatic</Button>
                <Button variant="success" onClick={() => { }}>Fanatic</Button>
            </div>

            <Card>
                <Button variant="success" disabled={true} onClick={() => { }}>Fanatic</Button>
                <Input placeholder="Fanatic" />
            </Card>

            <CarouselCard items={[
                "I signed a four-year, $44 million extension that later became one of the most team-friendly contracts in NBA history due to league revenue spikes.",
                "Curry was also the first player in NBA history to be elected MVP by a unanimous vote.",
                "He led the Golden State Warriors to three NBA championships and won two NBA Most Valuable Player Awards.",
                "He is widely regarded as one of the greatest basketball players of all time and as the greatest shooter in NBA history.",
                "Wait until you see how this carousel works with five different facts about Stephen Curry!"
            ]} />
            
        </div>
    );
}

export default Fanatic;