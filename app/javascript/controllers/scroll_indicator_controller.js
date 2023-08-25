import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="scroll-indicator"
export default class extends Controller {
  static targets = ["progressBar"];

  connect() {
    this._throttledScroll = this.throttle(() => {
      this.animateScroll();
    }, 10);

    window.addEventListener("scroll", () => {
      this._throttledScroll();
    });
  }

  disconnect() {
    window.removeEventListener("scroll", () => {
      this._throttledScroll();
    });
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
  throttle(callback, delay = 250) {
    let shouldWait = false;

    return (...args) => {
      if (shouldWait) return;

      callback(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, delay);
    };
  }
}
