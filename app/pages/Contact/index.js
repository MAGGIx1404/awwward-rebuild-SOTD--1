import Page from "classes/Page";
import Ukiyo from "ukiyojs";

export default class Contact extends Page {
  constructor() {
    super({
      classes: {
        active: "contact--active"
      },
      id: "contact",
      element: ".contact",
      elements: {
        wrapper: ".contact__wrapper", // scroller
        contact_pics: ".parallax__image"
      }
    });
  }

  create() {
    super.create();
    this.parallax();
  }

  parallax() {
    this.imgOne = [...this.elements.contact_pics];
    this.imgOne.forEach((el) => {
      this.parallaxEffect = new Ukiyo(el, {
        speed: 2.5,
        scale: 1.25
      });
    });
  }

  onResize() {
    super.onResize();
  }
}
