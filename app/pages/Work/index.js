import Page from "classes/Page";
// import cube from "vendors/cube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { delay } from "utils/math";
import Ukiyo from "ukiyojs";

export default class Work extends Page {
  constructor() {
    super({
      classes: {
        active: "work--active"
      },
      id: "work",
      element: ".work",
      elements: {
        wrapper: ".work__wrapper", // scroller
        home_pics: ".parallax__image"
      }
    });
  }

  create() {
    super.create();
    this.parallax();
  }

  parallax() {
    this.imgOne = [...this.elements.home_pics];

    this.imgOne.forEach((ele) => {
      this.parallaxEffect = new Ukiyo(ele, {
        speed: 1.5,
        scale: 1.5
      });
    });
  }

  onResize() {
    super.onResize();
  }
}
