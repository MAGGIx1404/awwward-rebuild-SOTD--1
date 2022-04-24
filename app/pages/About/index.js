import Page from "classes/Page";
// import cube from "vendors/cube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { delay } from "utils/math";

export default class About extends Page {
  constructor() {
    super({
      classes: {
        active: "about--active"
      },
      id: "about",
      element: ".about",
      elements: {
        wrapper: ".about__wrapper" // scroller
      }
    });
  }

  create() {
    super.create();
  }

  show() {
    this.element.classList.add(this.classes.active);
  }

  async hide() {
    this.element.classList.remove(this.classes.active);

    await delay(2000);

    return super.hide();
  }

  onResize() {
    super.onResize();
  }
}
