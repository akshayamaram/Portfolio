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

startLoad();

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
  console.log("loader on");
}

loaderAnimation();

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

worksPageAnimation();
