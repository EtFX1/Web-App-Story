import { useState, useEffect } from "react";
import { App } from "../App";
import { EndingPage } from "./EndingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import "../styles/homepage.css";

export const Options = () => {
    const [currentId, setCurrentId] = useState("0"); // Initial state set to the story ID "0"
    const [currentStory, setCurrentStory] = useState(null);
    const [showHome, setShowHome] = useState(false); // Manage whether to show Home
    const [showEnding, setShowEnding] = useState(false); // Manage EndingPage state

    // Fetch the story.json data based on the current ID
    useEffect(() => {
        const fetchStoryData = async () => {
            try {
                const res = await fetch("/story.json"); // Ensure the file is in the public folder
                const data = await res.json();
                const story = data.stories.find((s) => s.id === currentId);
                setCurrentStory(story);
            } catch (error) {
                console.error("Error fetching story data:", error);
            }
        };

        fetchStoryData();
    }, [currentId]); // Re-fetch data whenever currentId changes

    // Wait for the data to load
    if (!currentStory) {
        return <p>Loading...</p>;
    }

    // Render the Home component if `showHome` is true
    if (showHome) {
        return <App />;
    }

    if (showEnding) {
        return <EndingPage />;
    }

    return (
        <>
            {/* navbar */}
            <nav className="mini-nav">
                <FontAwesomeIcon
                    onClick={() => setShowHome(true)}
                    className="icon"
                    icon={faMoon}
                />
                <FontAwesomeIcon className="icon" icon={faVolumeHigh} />
            </nav>

            {/* text and buttons */}

            <div className="img-and-text-cont">
                {/* image */}
                <img
                    className="img"
                    src={currentStory.image}
                    alt="Story Scene"
                />
                <div className="text-and-btns-cont">
                    <p className="text">{currentStory.storyText}</p>
                    {currentStory.btnText === "Continue" ? (
                        <button
                            className="opt-btn-styles btn-styles"
                            onClick={() => {
                                if (
                                    currentStory.contBtnNextScene ===
                                    "ending-page"
                                ) {
                                    setShowEnding(true); // Show EndingPage
                                } else {
                                    setCurrentId(currentStory.contBtnNextScene); // Navigate to next scene
                                }
                            }}
                        >
                            {currentStory.btnText}
                        </button>
                    ) : (
                        <div className="btns-cont">
                            <button
                                className="opt-btn-styles btn-styles"
                                onClick={() =>
                                    setCurrentId(currentStory.btn1NextScene)
                                }
                            >
                                {currentStory.btn1Text}
                            </button>
                            <button
                                className="opt-btn-styles btn-styles"
                                onClick={() =>
                                    setCurrentId(currentStory.btn2NextScene)
                                }
                            >
                                {currentStory.btn2Text}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Options;
