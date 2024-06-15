NodeList.prototype.animate = function (keyframes, options) {
  this.forEach((el, i) => {
    let delay = options.delay;
    if (options.stagger) delay = options.delay + options.stagger * i;
    el.animate(keyframes, {
      ...options,
      delay
    });
  });
};

const colors = ["#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de","#48bfe3","#56cfe1","#64dfdf","#72efdd","#80ffdb"];
let rainbowEnd = '';
let rainbowEnd2 = '';
colors.reverse().forEach((c, i) => {
  rainbowEnd += `,0 ${(i - 5) * 5}vh ${i * 2}px ${c}`;
});
colors.forEach((c, i) => {
  rainbowEnd2 += `,0 ${(i - 5) * -5}vh ${i * 2}px ${c}`;
});

rainbowEnd = rainbowEnd.substring(1);
rainbowEnd2 = rainbowEnd2.substring(1);

document.querySelectorAll('h1 span').animate({
  textShadow: [rainbowEnd, rainbowEnd2]
}, {
  duration: 2000,
  stagger: 200,
  delay: -1000,
  iterations: Infinity,
  easing: 'cubic-bezier(0.3, 0, 0.7, 1)',
  direction: 'alternate',
  fill: 'both'
});