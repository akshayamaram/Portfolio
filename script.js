function smoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

// function cursorFollower() {
//     let cursor = document.querySelector("#cursor");
//     let main = document.querySelector("#main");

//     main.addEventListener("mousemove", function (dets) {
//       cursor.style.left = dets.x + "px";
//       cursor.style.top = dets.y + "px";
//     });
// }

// cursorFollower()

function startLoad() {
  let counterElem = document.querySelector(".counter");
  let currVal = 0;

  function updateCounter() {
    if (currVal === 100) {
      counterElem.style.pointerEvents = "none";
      document.querySelector(".overlay").style.pointerEvents = "none";
      return;
    }

    currVal += Math.floor(Math.random() * 10) + 1;

    if (currVal > 100) {
      currVal = 100;
    }

    counterElem.textContent = currVal;

    let delay = Math.floor(Math.random() * 200) + 50;

    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

function loaderAnimation() {
  var tl = gsap.timeline();

  tl.to(".counter", 0.25, {
    delay: 3.5,
    opacity: 0,
  });

  tl.to(".bar", 1.5, {
    // delay: 3.5,
    height: 0,
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
  });

  tl.from("#hero1", {
    y: "-100%",
    duration: 1,
    delay: 0.5,
    opacity: 0,
    ease: "expo.out",
  });

  tl.from("#hero2", {
    y: "100%",
    duration: 1,
    opacity: 0,
    ease: "expo.out",
  });
}

function worksPageAnimation() {
  const elements = document.querySelectorAll(".element");
  const movingImage = document.querySelector("#image");
  const worksPage = document.querySelector("#works-page");

  elements.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      let image = elem.getAttribute("data-image");
      let height = elem.getAttribute("data-height");
      let width = elem.getAttribute("data-width");
      movingImage.style.backgroundImage = `url(${image})`;
      movingImage.style.height = height;
      movingImage.style.width = width;
      // console.log("hello");
    });

    worksPage.addEventListener("mouseleave", function () {
      movingImage.style.backgroundImage = "none";
      movingImage.style.height = "0";
      movingImage.style.width = "0";
      // console.log("bye");
    });

    document.addEventListener("DOMContentLoaded", function () {
      document.addEventListener("mousemove", function (event) {
        const worksPageElement = document.getElementById("works-page");

        const rect = worksPageElement.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          movingImage.style.left = `${event.x - 150}px`;
          movingImage.style.top = `${event.y - 100}px`;
          // movingImage.style.backgroundImage = `url(${image})`;
          // console.log("hey");
        }
      });
    });
  });
}

smoothScroll();
startLoad();
loaderAnimation();
worksPageAnimation();
