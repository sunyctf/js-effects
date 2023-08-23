var i, count = 200,
    arrow,
    body,
    init,
    prefixTransform,
    touch = false,
    touchx,
    touchy;

body = document.querySelector("body");
body.innerHTML = (new Array(count + 1)).join('<div class="arrow"></div>');
arrow = document.getElementsByClassName("arrow");
//prefixTransform=["transform","webkitTransform","MozTransform"].filter(function(el) { return typeof(arrow[0].style[el])==="string"; }).pop();
prefixTransform = "transform";
init = function() {
    setTimeout(function() {
        for (i = 0; i < count; i += 1) {
            arrow[i].style.left = Math.floor(Math.random() * window.innerWidth) + "px";
            arrow[i].style.top = Math.floor(Math.random() * window.innerHeight) + "px";
            arrow[i].style[prefixTransform] = "rotate(" + Math.floor(Math.random() * 360) + "deg)";
        }
    }, 0);
}


window.addEventListener('touchstart', function(e) {
    touch = true;
    var x = e.touches[0].pageX,
        y = e.touches[0].pageY;
    arrowsPointTo(x, y);
})

window.addEventListener('touchmove', function(e) {
    if (!touch) return;
    var x = e.touches[0].pageX,
        y = e.touches[0].pageY;
    arrowsPointTo(x, y);
    e.preventDefault();
})

window.addEventListener('touchend', function(e) {
    touch = false;
})

window.addEventListener('mousemove', function(event) {
    var x = event.clientX,
        y = event.clientY;
    arrowsPointTo(x, y);
});



function arrowsPointTo(x, y) {
    var i, deg;
    for (i = 0; i < count; i += 1) {
        deg = angle({
            "x": parseInt(arrow[i].style.left, 10),
            "y": parseInt(arrow[i].style.top, 10)
        }, {
            "x": x,
            "y": y
        });
        arrow[i].style[prefixTransform] = "rotate(" + deg + "deg)";
    }
}

function angle(p1, p2) {
    var dx = p2.x - p1.x,
        dy = p2.y - p1.y,
        c = Math.sqrt(dx * dx + dy * dy),
        deg;
    deg = (c > 0) ? Math.asin(dy / c) / (Math.PI / 180) : 0;
    deg = (dx > 0) ? deg : 180 - deg;
    return (deg).toFixed(2);
}


window.onresize = init;
init();