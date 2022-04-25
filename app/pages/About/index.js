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
        about_pics: ".parallax__image",
        // sliders
        menu: ".about__team__menu",
        items: ".menu__item",
        images: ".menu__item__pic"
      }
    });
  }

  create() {
    super.create();
    this.parallax();
    this.slider();
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
    //     speed: 2,
    //     scale: 1.4
    //   });
    // });
  }

  onResize() {
    super.onResize();
  }

  slider() {
    let menuWidth = this.elements.menu.clientWidth;
    let itemWidth = this.elements.items[0].clientWidth;
    let wrapWidth = this.elements.items.length * itemWidth;

    let scrollSpeed = 0;
    let oldScrollY = 0;
    let scrollY = 0;
    let y = 0;

    const lerp = (v0, v1, t) => {
      return v0 * (1 - t) + v1 * t;
    };

    const dispose = (scroll) => {
      gsap.set(this.elements.items, {
        x: (i) => {
          return i * itemWidth + scroll;
        },
        modifiers: {
          x: (x, target) => {
            const s = gsap.utils.wrap(
              -itemWidth,
              wrapWidth - itemWidth,
              parseInt(x)
            );
            return `${s}px`;
          }
        }
      });
    };
    dispose(0);

    const handleMouseWheel = (e) => {
      scrollY -= e.deltaY * 0.9;
    };

    let touchStart = 0;
    let touchX = 0;
    let isDragging = false;
    const handleTouchStart = (e) => {
      touchStart = e.clientX || e.touches[0].clientX;
      isDragging = true;
      this.elements.menu.classList.add("is-dragging");
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      touchX = e.clientX || e.touches[0].clientX;
      scrollY += (touchX - touchStart) * 2.5;
      touchStart = touchX;
    };
    const handleTouchEnd = () => {
      isDragging = false;
      this.elements.menu.classList.remove("is-dragging");
    };

    this.elements.menu.addEventListener("mousewheel", handleMouseWheel);

    this.elements.menu.addEventListener("touchstart", handleTouchStart);
    this.elements.menu.addEventListener("touchmove", handleTouchMove);
    this.elements.menu.addEventListener("touchend", handleTouchEnd);

    this.elements.menu.addEventListener("mousedown", handleTouchStart);
    this.elements.menu.addEventListener("mousemove", handleTouchMove);
    this.elements.menu.addEventListener("mouseleave", handleTouchEnd);
    this.elements.menu.addEventListener("mouseup", handleTouchEnd);

    this.elements.menu.addEventListener("selectstart", () => {
      return false;
    });

    window.addEventListener("resize", () => {
      menuWidth = this.elements.menu.clientWidth;
      itemWidth = this.elements.items[0].clientWidth;
      wrapWidth = this.elements.items.length * itemWidth;
    });

    const render = () => {
      requestAnimationFrame(render);
      y = lerp(y, scrollY, 0.1);
      dispose(y);

      scrollSpeed = y - oldScrollY;
      oldScrollY = y;

      gsap.to(this.elements.items, {
        skewX: -scrollSpeed * 0.2,
        rotate: scrollSpeed * 0.01
        // scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
      });
    };
    render();
  }
}
