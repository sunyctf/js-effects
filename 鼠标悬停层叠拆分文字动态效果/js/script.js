/* 
 * HOVER ALPHA EFFECT
 * Move your mouse or drag your finger to change the alpha opacity color of the text, and to see 3 colorful text-shadow effects.
 *
 * Headline is editable, so place your cursor in the text and type anything else you'd like.
 *
 * #028 - #100DaysOfCode
 * By ilithya | 2019
 */

function getTwoDecimal(num) {
  // The +0.5 smoothens the transition change
  return parseFloat(num.toFixed(2) + 0.5);
}

const mouse = {
  decimal(coord) {
    return getTwoDecimal(coord / 1000);
  },
  x(e) {
    return Math.abs(e.clientX - window.innerWidth / 2);
  },
  y(e) {
    return Math.abs(e.clientY - window.innerHeight / 2);
  } };


const changeTextAlphaVal = (txt, e) => {
  const root = document.querySelector(":root");
  const cssVar = "--alpha";
  const currentAlpha = getComputedStyle(root).
  getPropertyValue(cssVar).
  trim();

  const max = parseFloat(currentAlpha);
  const dx = mouse.decimal(mouse.x(e));
  const dy = mouse.decimal(mouse.y(e));

  let alphaVal;
  if (dx <= 0) {
    alphaVal = dy >= max ? dy : getTwoDecimal(max - dy);
  } else {
    alphaVal = dx >= max ? dx : getTwoDecimal(max - dx);
  }

  txt.style.setProperty(cssVar, alphaVal);
};

function createShadow(e, currTarget) {
  // Walk effect based on Wes Bos' Mouse Move Shadow Exercise
  // https://tinyurl.com/touabxe
  const walk = Math.round(Math.max(window.innerWidth, window.innerHeight) / 6); // Or use 150?
  const coordWalk = (coord, side) => Math.round(coord / side * walk - walk / 2);
  const xWalk = coordWalk(e.clientX, currTarget.offsetWidth);
  const yWalk = coordWalk(e.clientY, currTarget.offsetHeight);

  const pink = [255, 0, 139];
  const blue = [0, 86, 255];
  const yellow = [255, 240, 0];
  const typoAlpha = 0.6;

  const typo = currTarget.querySelector(".typo");
  changeTextAlphaVal(typo, e); // Comment this if you don't want the text alpha opacity to change on interaction

  typo.style.textShadow = `
	  ${xWalk}px ${yWalk}px 0 rgba(${pink}, ${typoAlpha}),
	  ${xWalk * -1}px ${yWalk * 2}px 0 rgba(${blue}, ${typoAlpha}),
	  ${xWalk * -2}px ${yWalk * -1}px 0 rgba(${yellow}, ${typoAlpha})
	`;
}

function onMouseMove(e) {
  createShadow(e, e.currentTarget);
}
function onTouchMove(e) {
  createShadow(e.changedTouches[0], e.currentTarget);
}

const heading = document.querySelector(".heading");
heading.addEventListener("mousemove", onMouseMove);
heading.addEventListener("touchmove", onTouchMove);