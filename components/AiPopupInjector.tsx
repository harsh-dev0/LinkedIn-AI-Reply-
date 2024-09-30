import { createRoot, Root } from "react-dom/client";
import AIButton from "./AiIcon"; // Updated to match the correct component name
import AIPopup from "./AIGeneratorPopup";

// Function to inject the AI button into the LinkedIn message input
const injectAIButton = () => {
  // Containers for the AI button icon and popup components
  const popupContainer = document.createElement("div");
  const iconContainer = document.createElement("div");
  iconContainer.id = "ai-icon-container";

  let popupRoot: Root | null = null;
  let iconRoot: Root | null = null;
  let isPopupVisible = false; // Tracks if the popup is open
  let isIconClicked = false; // Tracks if the icon was clicked

  // Function to add the AI button to the LinkedIn message input
  const addAIButton = () => {
    const messageInput = document.querySelector<HTMLDivElement>(
      "div.msg-form__contenteditable"
    );

    if (messageInput && !document.getElementById("ai-icon-container")) {
      // Append the icon container to the input field's parent element
      messageInput.parentNode?.appendChild(iconContainer);

      if (!iconRoot) {
        iconRoot = createRoot(iconContainer);
        iconRoot.render(
          <AIButton handleMouseDown={handleIconMouseDown} handleClick={handleIconClick} />
        );
      }

      // Attach event listeners to manage showing and hiding the AI button
      messageInput.addEventListener("focus", handleInputFocus);
      messageInput.addEventListener("blur", handleInputBlur);
    }
  };

  // Show the AI button icon when the input field is focused
  const handleInputFocus = () => {
    iconContainer.style.display = "block";
  };

  // Hide the AI button icon when the input field is blurred
  const handleInputBlur = () => {
    setTimeout(() => {
      if (!isPopupVisible && !isIconClicked) {
        iconContainer.style.display = "none";
      }
      isIconClicked = false; // Reset the click state
    }, 100);
  };

  // Track icon click state to determine when it has been pressed
  const handleIconMouseDown = () => {
    isIconClicked = true;
  };

  // Handle AI button icon click to open the AI popup
  const handleIconClick = () => {
    if (!isPopupVisible) {
      isPopupVisible = true;
      document.body.appendChild(popupContainer);
      popupRoot = createRoot(popupContainer);

      // Function to manage the popup close action
      const closePopup = () => {
        isPopupVisible = false;
        popupRoot?.unmount(); // Unmount the popup component
        document.body.removeChild(popupContainer); // Remove the popup container from the DOM
        iconContainer.style.display = "block"; // Show the AI button icon again
      };

      popupRoot.render(<AIPopup popupManager={closePopup} />);
      iconContainer.style.display = "none"; // Hide the AI button icon while the popup is open
    }
  };

  // Debounce the addAIButton function to prevent excessive calls
  const debouncedAddAIButton = debounce(addAIButton, 300);

  // MutationObserver to watch for DOM changes and add the AI button as needed
  const observer = new MutationObserver(debouncedAddAIButton);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial call to add the AI button to the input
  addAIButton();

  // Cleanup function to disconnect the observer and remove all elements
  return () => {
    observer.disconnect();
    popupRoot?.unmount();
    iconRoot?.unmount();
    popupContainer.remove();
    iconContainer.remove();
  };
};

// Debounce utility function to limit the rate of function calls
const debounce = (func: () => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};

export default injectAIButton;
