import Page from "classes/Page";
// import cube from "vendors/cube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { delay } from "utils/math";
import Ukiyo from "ukiyojs";

export default class About extends Page {
  constructor() {
    super({
      classes: {
        active: "about--active"
      },
      id: "about",
      element: ".about",
      elements: {
        wrapper: ".about__wrapper", // scroller
        about_pics: ".parallax__image"
      }
    });
  }

  create() {
    super.create();
    this.parallax();
  }

  parallax() {
    // this.imgOne = [...this.elements.about_pics];
    this.imgOne = this.elements.about_pics;

    this.parallaxEffect = new Ukiyo(this.imgOne, {
      speed: 2,
      scale: 1.4
    });
    // this.imgOne.forEach((ele) => {
    //   this.parallaxEffect = new Ukiyo(ele, {
    //     speed: 2.5,
    //     scale: 1.3
    //   });
    // });
  }

  onResize() {
    super.onResize();
  }
}
