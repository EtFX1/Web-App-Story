import { useState, useEffect } from "react";
import { Options } from "./Components/Options";
import "./styles/index.css";

export const App = () => {
    const [currentStory, setCurrentStory] = useState(null);
    const [showOptions, setShowOptions] = useState(false); // Track whether to show Options

    // Fetch the story.json data
    useEffect(() => {
        const fetchStoryData = async () => {
            try {
                const res = await fetch("/story.json"); // Ensure the file is in the public folder
                const data = await res.json();
                const homePage = data.stories.find(
                    (story) => story.id === "home-page"
                );
                setCurrentStory(homePage);
            } catch (error) {
                console.error("Error fetching story data:", error);
            }
        };

        fetchStoryData();
    }, []);

    // Wait for the data to load
    if (!currentStory) {
        return <p>Loading...</p>;
    }

    return showOptions ? (
        <Options />
    ) : (
        <>
            <div className="cont">
                <div className="wordsCont">
                    <p className="small-text">Ethan Obott Presents...</p>
                    <h1 className="heading">A NIGHT TO REMEMBER</h1>
                    <p className="small-text">An interactive story</p>
                </div>
            </div>
            <div className="start-btn-cont">
                <button
                    className="start-btn-styles btn-styles"
                    onClick={() => setShowOptions(true)}
                >
                    Read Story
                </button>{" "}
            </div>
            {/* Show Options on click */}
        </>
    );
};
