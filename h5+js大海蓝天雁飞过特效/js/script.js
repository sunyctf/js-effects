var c = document.getElementById('container'),
    water = document.getElementById('water'),
    n = 55; 

new TimelineMax()
  .set(c, {minWidth:3200, width:'200%', height:'100%', backgroundImage:'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/fog3.png)'}, 0)
  .set(water, {width:'110%', height:300, left:'-20%', bottom:-50, perspective:500}, 0)
  .set('.bird', {width:60, left:-60, height:60, backgroundImage:'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/bird.png)'}, 0)
  .set('.bird1', {scale:0.7, top:130}, 0)
  .set('.bird2', {scale:0.65, top:67}, 0)
  .set('.bird3', {scale:0.6, top:89}, 0)
  .set('#compass', {left:30, bottom:70}, 0)
  .set('.cView',  {transformOrigin:'0 100%', rotation:-90}, 0)
  .from(c, 1, {opacity:0, ease:Power1.easeInOut}, 0)
  .from(c, 15, {backgroundPosition:'0px 999px', repeat:-1, ease:Power0.easeNone}, 0)
  .staggerFrom('.bird', 0.65, {backgroundPosition:'0px -840px', ease:SteppedEase.config(14), repeat:40}, 0.2, 0)
  .staggerFrom('.bird', 20, {x:3200, cycle:{y:[-10,125,53]}, rotation:1, ease:Power0.easeNone}, -0.4, 0)
  .call(function(){moveTL.progress(0.5)}, null, null, 0);


for (var i=0; i<n; i++){

  var b = document.createElement('div');
  b.className += 'box';
  water.appendChild(b);

  new TimelineMax()
    .set(b, {
      width:'100%',
      height:50,
      y:i*6.5,
      // opacity:0.5,
      backgroundImage:'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/waterDaytime.jpg)',
      backgroundPosition:'0px -'+String(i*5)+"px",
      transformOrigin:'50% 0%'
    }, 0)
    .to(b, 2, {
      y:'-='+String(2*(i/n*60)),
      scaleX:0.95+i/n*0.2,
      scaleY:2-i/n,
      // opacity:1-i/n,
      rotation:0.01,
      yoyo:true,
      repeat:-1,
      ease:Sine.easeInOut
    }, i/n)
    .to(b, 2.6, {
      x:'-='+String(100*(i/n*2)),
      yoyo:true,      
      repeat:-1,
      ease:Sine.easeInOut
    }, i/n)
}

var moveTL = new TimelineMax({paused:true})
  .to(c, 1, {x:'-=1200', ease:Power0.easeNone}, 0)
  .to('.cView', 1, {rotation:0, ease:Power0.easeNone}, 0);

window.addEventListener('mousemove', function(e){
 TweenMax.to(moveTL, 1, {progress:e.clientX/window.innerWidth})
});