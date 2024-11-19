import { useState, useEffect } from "react";
import { App } from "../App";
import { EndingPage } from "./EndingPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import "../styles/index.css";

export const Options = ({ initialId = "0" }) => {
    const [currentId, setCurrentId] = useState(initialId); // Use initialId to set the starting story ID
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

    // Function to handle audio playback
    const handlePlayAudio = () => {
        const audio = new Audio(
            currentId === "0" ? "/audio/start.mp3" : "/audio/next.mp3"
        );
        audio.play();
    };

    // Function to handle button clicks
    const handleButtonClick = (nextSceneId) => {
        if (currentId === "22A") {
            alert("Let's see if you're right");
        }
        setCurrentId(nextSceneId);
    };

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
                <div className="tooltip-container" data-tooltip="Home">
                    <FontAwesomeIcon
                        onClick={() => setShowHome(true)}
                        className="icon"
                        icon={faMoon}
                    />
                </div>
                <div
                    className="tooltip-container"
                    data-tooltip="Hear me read!"
                    onClick={handlePlayAudio} // Play audio when this icon is clicked
                >
                    <FontAwesomeIcon className="icon" icon={faVolumeHigh} />
                </div>
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
                                    handleButtonClick(
                                        currentStory.contBtnNextScene
                                    ); // Navigate to next scene
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
                                    handleButtonClick(
                                        currentStory.btn1NextScene
                                    )
                                }
                            >
                                {currentStory.btn1Text}
                            </button>
                            <button
                                className="opt-btn-styles btn-styles"
                                onClick={() =>
                                    handleButtonClick(
                                        currentStory.btn2NextScene
                                    )
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
