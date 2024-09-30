import React, { useState, useCallback, useEffect } from "react";
import CustomButton from "./ReusableButton";
import { fetchAIResponse } from "../tools/aiResponseFetcher"; // Utility function for fetching AI responses
import generateIcon from "../public/icon/Generate.svg";
import insertIcon from "../public/icon/Insert.svg";
import regenerateIcon from "../public/icon/Regenerate.svg";

// Props interface for the AI popup component
interface AIPopupProps {
  popupManager: () => void; // Function to close the popup
}

const AIPopup: React.FC<AIPopupProps> = ({ popupManager }) => {
  const [userInput, setUserInput] = useState<string>(""); // Stores the user's input
  const [aiGeneratedResponse, setAIGeneratedResponse] = useState<string>(""); // Stores the AI-generated response
  const [isLoading, setIsLoading] = useState<boolean>(false); // Tracks whether the AI response is being generated
  const [errorMessage, setErrorMessage] = useState<string>(""); // Tracks any error message during response generation

  // Function to generate AI response based on user input
  const handleGenerateResponse = useCallback(async () => {
    if (!userInput) return; // Prevent generation if input is empty

    setIsLoading(true);
    setErrorMessage(""); // Clear any previous errors
    try {
      const response = await fetchAIResponse(userInput); // Fetch AI response
      setAIGeneratedResponse(response); // Set the response to state
    } catch (error: any) {
      console.error("Failed to generate AI response:", error);
      setErrorMessage("An error occurred while generating the response. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [userInput]);

  // Function to insert AI response into the LinkedIn message input field
  const handleInsertResponse = () => {
    const messageInputField = document.querySelector<HTMLDivElement>("div.msg-form__contenteditable p");
    const inputContainer = document.querySelector<HTMLDivElement>("div.msg-form__contenteditable");
    const placeholderElement = document.querySelector<HTMLDivElement>("div.msg-form__placeholder");
    // Set attributes for accessibility and placeholder management
    if (messageInputField && inputContainer && placeholderElement) {
      messageInputField.innerHTML = aiGeneratedResponse;
      inputContainer.setAttribute("aria-label", "");
      placeholderElement.setAttribute("aria-hidden", "false");
      placeholderElement.setAttribute("data-placeholder", "");
      placeholderElement.textContent = "";

      // Clear inputs and close the popup after inserting the response
      setUserInput("");
      setAIGeneratedResponse("");
      popupManager();
    } else {
      console.error("One or more elements required for message input insertion not found:", { messageInputField, inputContainer, placeholderElement });
    }
  };

  // Clear error message after 3 seconds if an error occurred
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={popupManager} // Close the popup on outside click
      role="dialog"
      aria-labelledby="ai-popup"
    >
      <div
        className="absolute w-[500px] overflow-hidden bg-white shadow-lg p-4 gap-4 rounded-xl z-50"
        style={{ top: '210px', right: '310px' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing on inner div click
      >
        <h2 id="ai-popup" className="sr-only">
          AI Response Generator
        </h2>
        {errorMessage && <div className="text-red-600">{errorMessage}</div>} {/* Display error message */}

        {/* Display AI-generated response */}
        {aiGeneratedResponse && (
          <div className="mt-4">
            <div className="w-full flex justify-end">
              <div className="max-w-[75%] p-2 mb-6 bg-[#dfe1e7] rounded-xl text-[#666d80] text-2xl leading-9">
                {userInput}
              </div>
            </div>
            <div className="max-w-[75%] p-2 bg-blue-100 rounded-xl text-[#666d80] text-2xl leading-9 mb-6">
              {aiGeneratedResponse}
            </div>
          </div>
        )}

        {/* Input for user prompt */}
        <input
          className="w-full max-w-[818px] max-h-[61px] p-3 rounded-lg mb-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter your prompt here..."
          value={aiGeneratedResponse ? "" : userInput}
          onChange={(e) => setUserInput(e.target.value)}
          aria-label="User Input"
        />

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          {aiGeneratedResponse ? (
            <>
              <CustomButton
                label="Insert"
                icon={insertIcon}
                onClick={handleInsertResponse}
                className="custom-button max-w-[129px] bg-white text-[#666d80]"
              />
              <CustomButton
                label="Regenerate"
                icon={regenerateIcon}
                onClick={handleGenerateResponse}
                isLoading={isLoading}
                className="bg-blue-500 text-white"
              />
            </>
          ) : (
            <CustomButton
              label="Generate"
              icon={generateIcon}
              onClick={handleGenerateResponse}
              isLoading={isLoading}
              disabled={!userInput}
              className="bg-blue-500 text-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPopup;
