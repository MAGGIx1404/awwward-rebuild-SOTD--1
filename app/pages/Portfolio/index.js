import Page from "classes/Page";
// import cube from "vendors/cube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { delay } from "utils/math";
import Ukiyo from "ukiyojs";

export default class Portfolio extends Page {
  constructor() {
    super({
      classes: {
        active: "portfolio--active"
      },
      id: "portfolio",
      element: ".portfolio",
      elements: {
        wrapper: ".portfolio__wrapper", // scroller
        links_wrapper: ".portfolio__title__link",
        menu: ".portfolio__menu",
        items: ".portfolio__menu__item"
      }
    });
  }

  create() {
    super.create();
    this.infiniteList();
  }

  infiniteList() {
    let menuHeight = this.elements.menu.clientHeight;
    let itemHeight = this.elements.items[0].clientHeight;
    let wrapHeight = this.elements.items.length * itemHeight;

    let scrollSpeed = 0;
    let oldScrollY = 0;
    let scrollY = 0;
    let y = 0;

    const lerp = (v0, v1, t) => {
      return v0 * (1 - t) + v1 * t;
    };

    const dispose = (scroll) => {
      gsap.set(this.elements.items, {
        y: (i) => {
          return i * itemHeight + scroll;
        },
        modifiers: {
          y: (y) => {
            const s = gsap.utils.wrap(
              -itemHeight,
              wrapHeight - itemHeight,
              parseInt(y)
            );
            return `${s}px`;
          }
        }
      });
    };
    dispose(0);

    const handleMouseWheel = (e) => {
      scrollY -= e.deltaY * 3;
    };

    let touchStart = 0;
    let touchY = 0;
    let isDragging = false;
    const handleTouchStart = (e) => {
      touchStart = e.clientY || e.touches[0].clientY;
      isDragging = true;
      this.elements.menu.classList.add("is-dragging");
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      touchY = e.clientY || e.touches[0].clientY;
      scrollY += (touchY - touchStart) * 10;
      touchStart = touchY;
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
      menuHeight = this.elements.menu.clientHeight;
      itemHeight = this.elements.items[0].clientHeight;
      wrapHeight = this.elements.items.length * itemHeight;
    });

    const render = () => {
      requestAnimationFrame(render);
      y = lerp(y, scrollY, 0.04);
      dispose(y);

      scrollSpeed = y - oldScrollY;
      oldScrollY = y;

      // gsap.to(this.elements.items, {
      //   scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.0025,
      //   rotate: scrollSpeed * 0.2
      // });
    };
    render();
  }

  onResize() {
    super.onResize();
  }
}
