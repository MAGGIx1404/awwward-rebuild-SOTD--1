import Page from "classes/Page";
// import cube from "vendors/cube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { delay } from "utils/math";
import Ukiyo from "ukiyojs";

export default class Home extends Page {
  constructor() {
    super({
      classes: {
        active: "home--active"
      },
      id: "home",
      element: ".home",
      elements: {
        wrapper: ".home__wrapper", // scroller
        links_wrapper: ".home__title__link",
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
        speed: 2.5,
        scale: 1.25
      });
    });

    // this.parallaxEffect = new Ukiyo(this.imgOne, {
    //   speed: 2.5,
    //   scale: 1.25
    // });
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
