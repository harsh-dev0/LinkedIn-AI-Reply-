import injectAiButton from "../components/AiPopupInjector";
import "~/assets/main.css";

export default defineContentScript({
  matches: ["*://*.google.com/*", "*://*.linkedin.com/*"],
  main() {
    injectAiButton();
  },
});