/**
 * demo.js
 * https://coidea.website
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, COIDEA
 * https://coidea.website
 */

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d"),
    link = document.createElement('link');
    particles = [],
    amount = 0,
    mouse = { x: -9999, y: -9999 },
    radius = 1,
    colors = [
      "rgba(252,248,254,0.85)", 
      "rgba(220,203,255,0.75)", 
      "rgba(154,112,124,0.85)", 
      "rgba(192,213,255,0.85)", 
      "rgba(244,223,254,0.75)"
    ],
    headline = document.querySelector("#headline"),
    ww = window.innerWidth,
    wh = window.innerHeight;

function Particle(x, y) {

  this.x = Math.random() * ww;
  this.y = Math.random() * wh;
  this.dest = { x: x, y: y };
  this.r = Math.random() * 2 * Math.PI;
  this.vx = (Math.random() - 0.5) * 25;
  this.vy = (Math.random() - 0.5) * 25;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * 0.025 + 0.94;
  this.color = colors[Math.floor(Math.random() * 2.75)];
}

Particle.prototype.render = function() {

  this.accX = (this.dest.x - this.x) / 1000;
  this.accY = (this.dest.y - this.y) / 1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;
  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt(a * a + b * b);
  if (distance < (radius * 75)) {

    this.accX = (this.x - mouse.x) / 100;
    this.accY = (this.y - mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }
}

function onMouseMove(e) {

  mouse.x = e.clientX;
  mouse.y = e.clientY;
  }

  function onTouchMove(e) {

  if (e.touches.length > 0) {

    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e) {

  mouse.x = -9999;
  mouse.y = -9999;
}

function initScene() {

  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://fonts.googleapis.com/css?family=Abril+Fatface';
  document.getElementsByTagName('head')[0].appendChild(link);

  ctx.font = 'bold 16vw "Abril Fatface"';
  ctx.textAlign = "center";
  ctx.fillText(headline.innerHTML, ww / 2, wh / 1.6);

  var data = ctx.getImageData(0, 0, ww, wh).data;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];
  for (var i = 0; i < ww; i += Math.round(ww / 200)) {
    for (var j = 0; j < wh; j += Math.round(ww / 200)) {
      if (data[((i + j * ww) * 4) + 3] > 200) {
      
        particles.push(new Particle(i, j));
      }
    }
  }
  amount = particles.length;
}

function render(a) {

  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {

    particles[i].render();
  }
}

headline.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);