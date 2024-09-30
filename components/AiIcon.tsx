import React from "react";
import magicIcon from "../public/icon/MagicIcon.svg"; // Importing the icon for the AI assistant button

// Props interface for the AI button component
interface AIButtonProps {
  handleClick: () => void; // Callback function for click event
  handleMouseDown?: () => void; // Optional callback function for mouse down event
}

// AI Button component to trigger AI-related features
const AIButton: React.FC<AIButtonProps> = ({ handleClick, handleMouseDown }) => (
  <div
    // Container for AI button
    className="absolute right-0 bottom-0 cursor-pointer text-white p-1 rounded inline-flex items-center"
    onClick={handleClick} // Trigger the click callback when clicked
    onMouseDown={handleMouseDown} // Trigger the mouse down callback if provided
    aria-label="AI Assistant Button" // Accessibility label for screen readers
  >
    <img 
      src={magicIcon} 
      alt="AI Assistant Icon" 
      className="w-[32px] h-[32px]" // Styles for the AI assistant icon
    />
  </div>
);

export default AIButton;
