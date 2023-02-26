c = document.getElementById("canv");
$ = c.getContext("2d");
w = c.width;
h = c.height;
id = $.createImageData(w, h);

function draw() {
  window.requestAnimationFrame(draw);
    var r;
    for (var p = 4 * (w * h - 1); p >= 0; p -= 4) {
        r = Math.random();
        id.data[p] = id.data[p+1] = id.data[p+2] = 255 * Math.pow(r, 1.6);
        id.data[p+3] = 255;
    }
    $.putImageData(id, 0, 0);
}

draw();