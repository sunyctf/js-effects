/*
(Book REF) HTML5 Canvas Ch. 5:  Math, Physics, and Animation ::: Uniform Circular Motion
By Steve Fulton and Jeff Fulton
*/
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();
window.addEventListener('load', start, false);

var c,
  $,
  w,
  h,
  msX,
  msY,
  midX,
  midY,
  num = 650,
  parts = [],
  begin = 50,
  repeat = 20,
  end = Math.PI * 2,
  force = null,
  msdn = false;

function start() {
  c = document.getElementById('canv');
  $ = c.getContext('2d');
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  midX = w / 2;
  midY = h / 2;
  force = Math.max(w, h) * 0.09;
  flow = begin;

  window.requestAnimFrame(create);
  run();
}

function run() {
  window.requestAnimFrame(run);
  go();
}

function Part() {
  this.deg = 0;
  this.rad = 0;
  this.x = 0;
  this.y = 0;
  this.distX = 0;
  this.distY = 0;
  this.color = 'rgb(' + Math.floor(Math.random() * 130) + ',' + Math.floor(Math.random() * 50) + ',' + Math.floor(Math.random() * 100) + ')';
  this.size;
}

function create() {
  var n = num;
  while (n--) {
    var p = new Part();
    p.deg = Math.floor(Math.random() * 360);
    p.rad = Math.floor(Math.random() * w * 0.5);
    p.x = p.distX = Math.floor(Math.random() * w);
    p.y = p.distY = Math.floor(Math.random() * h);
    p.size = 1 + Math.floor(Math.random() * (p.rad * 0.055));
    parts[n] = p;
  }
  c.onmousemove = msmv;
  c.onmousedown = msdn;
  c.onmouseup = msup;

  var int = setInterval(function() {
    flow--;
    if (flow === repeat) clearInterval(int);
  }, 20);
}

function go() {
  $.globalCompositeOperation = 'source-over';
  $.fillStyle = 'hsla(242, 30%, 5%, .55)';
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = 'lighter';
  var mx = msX;
  var my = msY;
  var bounds = force;
  if (msdn) {
    bounds = force * 2;
  }
  var n = num;
  while (n--) {
    var p = parts[n];
    var radi = Math.PI / 180 * p.deg;
    p.distX = midX + p.rad * Math.cos(radi);
    p.distY = midY + p.rad * Math.sin(radi) * 0.4;
    if (mx && my) {
      var react = Math.floor((bounds * 0.5) + Math.random() * (bounds * 0.9));
      if (p.distX - mx > 0 &&
        p.distX - mx < bounds &&
        p.distY - my > 0 &&
        p.distY - my < bounds) {
        p.distX += react;
        p.distY += react;
      } else if (p.distX - mx > 0 &&
        p.distX - mx < bounds &&
        p.distY - my < 0 &&
        p.distY - my > -bounds) {
        p.distX += react;
        p.distY -= react;
      } else if (p.distX - mx < 0 &&
        p.distX - mx > -bounds &&
        p.distY - my > 0 &&
        p.distY - my < bounds) {
        p.distX -= react;
        p.distY += react;
      } else if (p.distX - mx < 0 &&
        p.distX - mx > -bounds &&
        p.distY - my < 0 &&
        p.distY - my > -bounds) {
        p.distY -= react;
        p.distY -= react;
      }
    }
    p.x += ((p.distX - p.x) / flow);
    p.y += ((p.distY - p.y) / flow);
    var x = p.x;
    var y = p.y;
    var s = p.size * (p.y * 1.5 / h);
    if (s < 0.1) {
      s = 0;
    }
    $.beginPath();
    $.fillStyle = p.color;
    $.arc(x, y, s, 0, end, true);
    $.fill();
    $.closePath();
    var vary;
    if (p.size < 2) {
      vary = 4;
    } else if (p.size < 3) {
      vary = 3;
    } else if (p.size < 4) {
      vary = 2;
    } else {
      vary = 1;
    }
    vary *= (p.y / (h * 0.9));
    p.deg += vary;
    p.deg = p.deg % 360;
  }
}

function msmv(e) {
  var p = getPos(e.target);
  var sX = window.pageXOffset;
  var sY = window.pageYOffset;
  msX = e.clientX - p.x + sX;
  msY = e.clientY - p.y + sY;
}

function msdn(e) {
  msdn = true;
}

function msup(e) {
  msdn = false;
}

function getPos(el) {
  var cosmo = {};
  cosmo.x = el.offsetLeft;
  cosmo.y = el.offsetTop;
  while (el.offsetParent) {
    el = el.offsetParent;
    cosmo.x += el.offsetLeft;
    cosmo.y += el.offsetTop;
  }
  return cosmo;
}