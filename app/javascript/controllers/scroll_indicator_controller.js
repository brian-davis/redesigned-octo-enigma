import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="scroll-indicator"
export default class extends Controller {
  static targets = ["progressBar"];

  connect() {
    if (!window.onscroll) {
      const debouncedScroll = this.debounce(() => {
        this.animateScroll();
      }, 10);

      window.onscroll = () => {
        debouncedScroll();
      };
    }
  }

  // https://www.w3schools.com/howto/howto_js_scroll_indicator.asp
  animateScroll() {
    // console.log("animateScroll");
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    this.progressBarTarget.style.width = scrolled + "%";
  }

  // https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/
  debounce(callback, delay = 250) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }
}
