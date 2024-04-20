import { useState, useEffect } from "react";

const CustomTypingText = ({ text }) => {
	const [displayedText, setDisplayedText] = useState("");

	useEffect(() => {
		const displayTextWithDelay = async () => {
			for (let i = 0; i < text.length; i++) {
				await new Promise((resolve) => setTimeout(resolve, 150)); // Adjust typing speed here
				console.log(displayedText);
				setTimeout(() => {
					setDisplayedText((prevText) => prevText + text[i]);
				}, 0);
			}
		};

		displayTextWithDelay();

		return () => {}; // Cleanup function (optional)
	}, [text]);

	return <div className="animate">{displayedText}</div>;
};

export default CustomTypingText;
