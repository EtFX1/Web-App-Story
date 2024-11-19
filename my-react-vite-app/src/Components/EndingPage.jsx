import { useState } from "react";
import { App } from "../App";
import Options from "./Options";

export const EndingPage = () => {
    const [showHome, setShowHome] = useState(false); // Manage whether to show the App component
    const [startFrom6A, setStartFrom6A] = useState(false); // Manage whether to start Options from "6A"

    // Show the App component if `showHome` is true
    if (showHome) {
        return <App />;
    }

    // Show the Options component starting from "6A" if `startFrom6A` is true
    if (startFrom6A) {
        return <Options initialId="6A" />;
    }

    return (
        <div className="ending-page-cont">
            <img
                className="ending-img"
                src="../images/the-end-img.jpg"
                alt="End page"
            />
            <p>
                You’ve reached the end of the story! Were you happy with your
                ending? If you want to end the game, just... close the tab. (I
                mean, you’re in a browser 🤷‍♂️). Otherwise, you can choose to play
                from the beginning. Or you can make the opposite decision you
                made previously at the club to see what happens! Where do you
                want to go back to?
            </p>
            <h1 className="the-end-text">The end!</h1>
            <button
                className="opt-btn-styles btn-styles"
                onClick={() => setShowHome(true)} // Set flag to true to show App
            >
                The beginning
            </button>
            <button
                className="opt-btn-styles btn-styles"
                onClick={() => setStartFrom6A(true)} // Set flag to true to show Options from "6A"
            >
                Outside the club
            </button>
        </div>
    );
};

export default EndingPage;
