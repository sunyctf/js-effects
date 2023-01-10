function Stats()
{
  this.init();
}

Stats.prototype =
  {
  init: function()
  {
    this.frames = 0;
    this.framesMin = 100;
    this.framesMax = 0;

    this.time = new Date().getTime();
    this.timePrev = new Date().getTime();

    this.container = document.createElement("div");
    this.container.style.position = 'absolute';
    this.container.style.fontFamily = 'Arial';
    this.container.style.fontSize = '10px';
    this.container.style.backgroundColor = '#000020';
    this.container.style.opacity = '0.9';
    this.container.style.width = '80px';
    this.container.style.paddingTop = '2px';

    this.framesText = document.createElement("div");
    this.framesText.style.color = '#00ffff';
    this.framesText.style.marginLeft = '3px';
    this.framesText.style.marginBottom = '3px';
    this.framesText.innerHTML = '<strong>FPS</strong>';
    this.container.appendChild(this.framesText);

    this.canvas = document.createElement("canvas");
    this.canvas.width = 74;
    this.canvas.height = 30;
    this.canvas.style.display = 'block';
    this.canvas.style.marginLeft = '3px';
    this.canvas.style.marginBottom = '3px';
    this.container.appendChild(this.canvas);

    this.context = this.canvas.getContext("2d");
    this.context.fillStyle = '#101030';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height );

    this.contextImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    setInterval( bargs( function( _this ) { _this.update(); return false; }, this ), 1000 );
  },

  getDisplayElement: function()
  {
    return this.container;
  },

  tick: function()
  {
    this.frames++;
  },

  update: function()
  {
    this.time = new Date().getTime();

    this.fps = Math.round((this.frames * 1000 ) / (this.time - this.timePrev)); //.toPrecision(2);

    this.framesMin = Math.min(this.framesMin, this.fps);
    this.framesMax = Math.max(this.framesMax, this.fps);

    this.framesText.innerHTML = '<strong>' + this.fps + ' FPS</strong> (' + this.framesMin + '-' + this.framesMax + ')';

    this.contextImageData = this.context.getImageData(1, 0, this.canvas.width - 1, 30);
    this.context.putImageData(this.contextImageData, 0, 0);

    this.context.fillStyle = '#101030';
    this.context.fillRect(this.canvas.width - 1, 0, 1, 30);

    this.index = ( Math.floor(30 - Math.min(30, (this.fps / 60) * 30)) );

    this.context.fillStyle = '#80ffff';
    this.context.fillRect(this.canvas.width - 1, this.index, 1, 1);

    this.context.fillStyle = '#00ffff';
    this.context.fillRect(this.canvas.width - 1, this.index + 1, 1, 30 - this.index);

    this.timePrev = this.time;
    this.frames = 0;
  }
}

// Hack by Spite

function bargs( _fn )
{
  var args = [];
  for( var n = 1; n < arguments.length; n++ )
    args.push( arguments[ n ] );
  return function () { return _fn.apply( this, args ); };
}


(function (window){

  var Sakri = window.Sakri || {};
  window.Sakri = window.Sakri || Sakri;

  Sakri.MathUtil = {};

  //return number between 1 and 0 | 返回介于1和0之间的数字
  Sakri.MathUtil.normalize = function(value, minimum, maximum){
    return (value - minimum) / (maximum - minimum);
  };

  //map normalized number to values | 将标准化数字映射到值
  Sakri.MathUtil.interpolate = function(normValue, minimum, maximum){
    return minimum + (maximum - minimum) * normValue;
  };

  //map a value from one set to another | 将值从一个集合映射到另一个集合
  Sakri.MathUtil.map = function(value, min1, max1, min2, max2){
    return Sakri.MathUtil.interpolate( Sakri.MathUtil.normalize(value, min1, max1), min2, max2);
  };


  Sakri.MathUtil.hexToRgb = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF") | 将速记形式（例如“03F”）扩展为完整形式（例如，“0033FF”）
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  Sakri.MathUtil.getRandomNumberInRange = function(min, max){
    return min + Math.random() * (max - min);
  };

  Sakri.MathUtil.getRandomIntegerInRange = function(min, max){
    return Math.round(Sakri.MathUtil.getRandomNumberInRange(min, max));
  };


}(window));


//has a dependency on Sakri.MathUtil | 依赖于Sakri.MathUtil

(function (window){

  var Sakri = window.Sakri || {};
  window.Sakri = window.Sakri || Sakri;

  Sakri.Geom = {};

  //==================================================
  //=====================::POINT | 点::====================
  //==================================================

  Sakri.Geom.Point = function (x,y){
    this.x = isNaN(x) ? 0 : x;
    this.y = isNaN(y) ? 0 : y;
  };

  Sakri.Geom.Point.prototype.clone = function(){
    return new Sakri.Geom.Point(this.x,this.y);
  };

  Sakri.Geom.Point.prototype.update = function(x, y){
    this.x = isNaN(x) ? this.x : x;
    this.y = isNaN(y) ? this.y : y;
  };


  //==================================================
  //===================::RECTANGLE | 矩形::==================
  //==================================================

  Sakri.Geom.Rectangle = function (x, y, width, height){
    this.update(x, y, width, height);
  };

  Sakri.Geom.Rectangle.prototype.update = function(x, y, width, height){
    this.x = isNaN(x) ? 0 : x;
    this.y = isNaN(y) ? 0 : y;
    this.width = isNaN(width) ? 0 : width;
    this.height = isNaN(height) ? 0 : height;
  };

  Sakri.Geom.Rectangle.prototype.getRight = function(){
    return this.x + this.width;
  };

  Sakri.Geom.Rectangle.prototype.getBottom = function(){
    return this.y + this.height;
  };

  Sakri.Geom.Rectangle.prototype.getCenter = function(){
    return new Sakri.Geom.Point(this.getCenterX(), this.getCenterY());
  };

  Sakri.Geom.Rectangle.prototype.getCenterX = function(){
    return this.x + this.width/2;
  };

  Sakri.Geom.Rectangle.prototype.getCenterY=function(){
    return this.y + this.height/2;
  };

  Sakri.Geom.Rectangle.prototype.containsPoint = function(x, y){
    return x >= this.x && y >= this.y && x <= this.getRight() && y <= this.getBottom();
  };


  Sakri.Geom.Rectangle.prototype.clone = function(){
    return new Sakri.Geom.Rectangle(this.x, this.y, this.width, this.height);
  };

  Sakri.Geom.Rectangle.prototype.toString = function(){
    return "Rectangle{x:"+this.x+" , y:"+this.y+" , width:"+this.width+" , height:"+this.height+"}";
  };


}(window));



/**
     * Created by sakri on 27-1-14. | 由于sakri于27-1-14创建
     * has a dependecy on Sakri.Geom | 依赖Sakri.Geom
     * has a dependecy on Sakri.BitmapUtil | 依赖Sakri.BitmapUtil
     */

(function (window){

  var Sakri = window.Sakri || {};
  window.Sakri = window.Sakri || Sakri;

  Sakri.CanvasTextUtil = {};

  //returns the biggest font size that best fits into given width | 返回最适合给定宽度的最大字体大小
  Sakri.CanvasTextUtil.getFontSizeForWidth = function(string, fontProps, width, canvas, fillStyle, maxFontSize){
    if(!canvas){
      var canvas = document.createElement("canvas");
    }
    if(!fillStyle){
      fillStyle = "#000000";
    }
    if(isNaN(maxFontSize)){
      maxFontSize = 500;
    }
    var context = canvas.getContext('2d');
    context.font = fontProps.getFontString();
    context.textBaseline = "top";

    var copy = fontProps.clone();
    //console.log("getFontSizeForWidth() 1  : ", copy.fontSize);
    context.font = copy.getFontString();
    var textWidth = context.measureText(string).width;

    //SOME DISAGREEMENT WHETHER THIS SHOOULD BE WITH && or ||
    if(textWidth < width){
      while(context.measureText(string).width < width){
        copy.fontSize++;
        context.font = copy.getFontString();
        if(copy.fontSize > maxFontSize){
          console.log("getFontSizeForWidth() max fontsize reached");
          return null;
        }
      }
    }else if(textWidth > width){
      while(context.measureText(string).width > width){
        copy.fontSize--;
        context.font = copy.getFontString();
        if(copy.fontSize < 0){
          console.log("getFontSizeForWidth() min fontsize reached");
          return null;
        }
      }
    }
    //console.log("getFontSizeForWidth() 2  : ", copy.fontSize);
    return copy.fontSize;
  };


  //=========================================================================================
  //==============::CANVAS TEXT PROPERTIES | 画布文本属性::====================================
  //========================================================

  Sakri.CanvasTextProperties = function(fontWeight, fontStyle, fontSize, fontFace){
    this.setFontWeight(fontWeight);
    this.setFontStyle(fontStyle);
    this.setFontSize(fontSize);
    this.fontFace = fontFace ? fontFace : "sans-serif";
  };

  Sakri.CanvasTextProperties.NORMAL = "normal";
  Sakri.CanvasTextProperties.BOLD = "bold";
  Sakri.CanvasTextProperties.BOLDER = "bolder";
  Sakri.CanvasTextProperties.LIGHTER = "lighter";

  Sakri.CanvasTextProperties.ITALIC = "italic";
  Sakri.CanvasTextProperties.OBLIQUE = "oblique";


  Sakri.CanvasTextProperties.prototype.setFontWeight = function(fontWeight){
    switch (fontWeight){
      case Sakri.CanvasTextProperties.NORMAL:
      case Sakri.CanvasTextProperties.BOLD:
      case Sakri.CanvasTextProperties.BOLDER:
      case Sakri.CanvasTextProperties.LIGHTER:
        this.fontWeight = fontWeight;
        break;
      default:
        this.fontWeight = Sakri.CanvasTextProperties.NORMAL;
    }
  };

  Sakri.CanvasTextProperties.prototype.setFontStyle = function(fontStyle){
    switch (fontStyle){
      case Sakri.CanvasTextProperties.NORMAL:
      case Sakri.CanvasTextProperties.ITALIC:
      case Sakri.CanvasTextProperties.OBLIQUE:
        this.fontStyle = fontStyle;
        break;
      default:
        this.fontStyle = Sakri.CanvasTextProperties.NORMAL;
    }
  };

  Sakri.CanvasTextProperties.prototype.setFontSize = function(fontSize){
    if(fontSize && fontSize.indexOf && fontSize.indexOf("px")>-1){
      var size = fontSize.split("px")[0];
      fontProperites.fontSize = isNaN(size) ? 24 : size;//24 is just an arbitrary number | 24只是一个任意数字
      return;
    }
    this.fontSize = isNaN(fontSize) ? 24 : fontSize;//24 is just an arbitrary number
  };

  Sakri.CanvasTextProperties.prototype.clone = function(){
    return new Sakri.CanvasTextProperties(this.fontWeight, this.fontStyle, this.fontSize, this.fontFace);
  };

  Sakri.CanvasTextProperties.prototype.getFontString = function(){
    return this.fontWeight + " " + this.fontStyle + " " + this.fontSize + "px " + this.fontFace;
  };

}(window));


window.requestAnimationFrame =
        window.__requestAnimationFrame ||
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                (function () {
                    return function (callback, element) {
                        var lastTime = element.__lastTime;
                        if (lastTime === undefined) {
                            lastTime = 0;
                        }
                        var currTime = Date.now();
                        var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                        window.setTimeout(callback, timeToCall);
                        element.__lastTime = currTime + timeToCall;
                    };
                })();

var readyStateCheckInterval = setInterval( function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        init();
    }
}, 10);

//========================
//general properties for demo set up | 演示设置的常规属性
//========================

var canvas;
var context;
var canvasContainer;
var htmlBounds;
var bounds;
var minimumStageWidth = 250;
var minimumStageHeight = 250;
var maxStageWidth = 1000;
var maxStageHeight = 600;
var resizeTimeoutId = -1;
var stats;

function init(){
    canvasContainer = document.getElementById("canvasContainer");
    window.onresize = resizeHandler;
    stats = new Stats();
    canvasContainer.appendChild( stats.getDisplayElement() );
    commitResize();
}

function getWidth( element ){return Math.max(element.scrollWidth,element.offsetWidth,element.clientWidth );}
function getHeight( element ){return Math.max(element.scrollHeight,element.offsetHeight,element.clientHeight );}

//avoid running resize scripts repeatedly if a browser window is being resized by dragging
function resizeHandler(){
    context.clearRect(0,0,canvas.width, canvas.height);
    clearTimeout(resizeTimeoutId);
    clearTimeoutsAndIntervals();
    resizeTimeoutId = setTimeout(commitResize, 300 );
}

function commitResize(){
    if(canvas){
        canvasContainer.removeChild(canvas);
    }
    canvas = document.createElement('canvas');
    canvas.style.position = "absolute";
    context = canvas.getContext("2d");
    canvasContainer.appendChild(canvas);

    htmlBounds = new Sakri.Geom.Rectangle(0,0, getWidth(canvasContainer) , getHeight(canvasContainer));
    if(htmlBounds.width >= maxStageWidth){
        canvas.width = maxStageWidth;
        canvas.style.left = htmlBounds.getCenterX() - (maxStageWidth/2)+"px";
    }else{
        canvas.width = htmlBounds.width;
        canvas.style.left ="0px";
    }
    if(htmlBounds.height > maxStageHeight){
        canvas.height = maxStageHeight;
        canvas.style.top = htmlBounds.getCenterY() - (maxStageHeight/2)+"px";
    }else{
        canvas.height = htmlBounds.height;
        canvas.style.top ="0px";
    }
    bounds = new Sakri.Geom.Rectangle(0,0, canvas.width, canvas.height);
    context.clearRect(0,0,canvas.width, canvas.height);

    if(bounds.width<minimumStageWidth || bounds.height<minimumStageHeight){
        stageTooSmallHandler();
        return;
    }

    var textInputSpan = document.getElementById("textInputSpan");
    textInputSpan.style.top = htmlBounds.getCenterY() + (bounds.height/2) + 20 +"px";
    textInputSpan.style.left = (htmlBounds.getCenterX() - getWidth(textInputSpan)/2)+"px";

    startDemo();
}

function stageTooSmallHandler(){
    var warning = "Sorry, bigger screen required :(";
    context.font = "bold normal 24px sans-serif";
    context.fillText(warning, bounds.getCenterX() - context.measureText(warning).width/2, bounds.getCenterY()-12);
}




//========================
//Demo specific properties | 演示特定属性
//========================

var animating = false;
var particles = [];
var numParticles = 4000;
var currentText = "SAKRI";
var fontRect;
var fontProperties = new Sakri.CanvasTextProperties(Sakri.CanvasTextProperties.BOLD, null, 100);
var animator;
var particleSource = new Sakri.Geom.Point();;
var particleSourceStart = new Sakri.Geom.Point();
var particleSourceTarget = new Sakri.Geom.Point();

var redParticles = ["#fe7a51" , "#fdd039" , "#fd3141"];
var greenParticles = ["#dbffa6" , "#fcf8fd" , "#99de5e"];
var pinkParticles = ["#fef4f7" , "#f2a0c0" , "#fb3c78"];
var yellowParticles = ["#fdfbd5" , "#fff124" , "#f4990e"];
var blueParticles = ["#9ca2df" , "#222a6d" , "#333b8d"];

var particleColorSets = [redParticles, greenParticles, pinkParticles, yellowParticles, blueParticles];
var particleColorIndex = 0;

var renderParticleFunction;
var renderBounds;
var particleCountOptions = [2000, 4000, 6000, 8000, 10000, 15000, 20000 ];
var pixelParticleCountOptions = [10000, 40000, 60000, 80000, 100000, 150000 ];

function clearTimeoutsAndIntervals(){
    animating = false;
}

function startDemo(){

    fontRect = new Sakri.Geom.Rectangle(Math.floor(bounds.x + bounds.width*.2), 0, Math.floor(bounds.width - bounds.width*.4), bounds.height);
    fontProperties.fontSize = 100;
    fontProperties.fontSize = Sakri.CanvasTextUtil.getFontSizeForWidth(currentText, fontProperties, fontRect.width, canvas);
    fontRect.y = Math.floor(bounds.getCenterY() - fontProperties.fontSize/2);
    fontRect.height = fontProperties.fontSize;
    renderBounds = fontRect.clone();
    renderBounds.x -= Math.floor(canvas.width *.1);
    renderBounds.width += Math.floor(canvas.width *.2);
    renderBounds.y -= Math.floor(fontProperties.fontSize *.5);
    renderBounds.height += Math.floor(fontProperties.fontSize *.6);
    context.font = fontProperties.getFontString();

    createParticles();
    context.globalAlpha = globalAlpha;
    animating = true;
    loop();
}


function loop(){
    if(!animating){
        return;
    }
    stats.tick();
    renderParticles();
    window.requestAnimationFrame(loop, canvas);
}


function createParticles(){
    context.clearRect(0,0,canvas.width, canvas.height);
    context.fillText(currentText, fontRect.x, fontRect.y);
    var imageData = context.getImageData(fontRect.x, fontRect.y, fontRect.width, fontRect.height);
    var data = imageData.data;
    var length = data.length;
    var rowWidth = fontRect.width*4;
    var i, y, x;

    particles = [];
    for(i=0; i<length; i+=4){
        if(data[i+3]>0){
            y = Math.floor(i / rowWidth);
            x = fontRect.x + (i - y * rowWidth) / 4;
            particles.push(x);//x
            particles.push(fontRect.y + y);//y
            particles.push(x);//xOrigin
            particles.push(fontRect.y + y);//yOrigin
        }
    }

    //console.log(particles.length);
    context.clearRect(0,0,canvas.width, canvas.height);

    //pre calculate random numbers used for particle movement | 预先计算用于粒子运动的随机数
    xDirections = [];
    yDirections = [];
    for(i=0; i<directionCount; i++){
        xDirections[i] = -7 + Math.random() * 14;
        yDirections[i] = Math.random()* - 5;
    }
}


var xDirections, yDirections;
//fidget with these to manipulate effect | 摆弄这些来操纵效果
var globalAlpha = .11; //amount of trails or tracers
var xWind = 0; //all particles x is effected by this | 所有粒子x都受此影响
var threshold = 60; //if a pixels red component is less than this, return particle to it's original position | 如果像素红色分量小于此值，则将粒子返回到其原始位置
var amountRed = 25; //amount of red added to a pixel occupied by a particle | 添加到粒子所占像素的红色量
var amountGreen = 12; //amount of green added to a pixel occupied by a particle | 添加到粒子所占像素的绿色量
var amountBlue = 1; //amount of blue added to a pixel occupied by a particle | 添加到粒子所占像素的蓝色量
var directionCount = 100; //number of random pre-calculated x and y directions | 随机预先计算的x和y方向的数量

function renderParticles(){
    //fill renderBounds area with a transparent black, and render a nearly black text | 用透明黑色填充renderBounds区域，并渲染近乎黑色的文本
    context.fillStyle = "#000000";
    context.fillRect(renderBounds.x, renderBounds.y, renderBounds.width, renderBounds.height);
    context.fillStyle = "#010000";
    context.fillText(currentText, fontRect.x, fontRect.y);

    var randomRed = amountRed -5 + Math.random()*10;
    var randomGreen = amountGreen -2 + Math.random()*4;

    var imageData = context.getImageData(renderBounds.x, renderBounds.y, renderBounds.width, renderBounds.height);
    var data = imageData.data;
    var rowWidth = imageData.width * 4;
    var index, i, length = particles.length;
    var d = Math.floor(Math.random()*30);
    xWind += (-.5 + Math.random());//move randomly left or right | 随机向左或向右移动
    xWind = Math.min(xWind, 1.5);//clamp to a maximum wind | 夹紧到最大风力
    xWind = Math.max(xWind, -1.5);//clamp to a minimum wind | 夹紧到最小风力
    for(i=0; i<length; i+=4, d++ ){

        particles[i] += (xDirections[d % directionCount] + xWind);
        particles[i+1] += yDirections[d % directionCount];

        index = Math.round(particles[i] - renderBounds.x) * 4 + Math.round(particles[i+1] - renderBounds.y) * rowWidth;

        data[index] += randomRed;
        data[index + 1] += randomGreen;
        data[index + 2] += amountBlue;

        //if pixels red component is below set threshold, return particle to orgin | 如果像素红色分量低于设置的阈值，则将粒子返回到原点
        if( data[index] < threshold){
            particles[i] = particles[i+2];
            particles[i+1] = particles[i+3];
        }
    }
    context.putImageData(imageData, renderBounds.x, renderBounds.y);
}



var maxCharacters = 10;

function changeText(){
    var textInput = document.getElementById("textInput");
    if(textInput.value && textInput.text!=""){
        if(textInput.value.length > maxCharacters){
            alert("Sorry, there is only room for "+maxCharacters+" characters. Try a shorter name.");
            return;
        }
        if(textInput.value.indexOf(" ")>-1){
            alert("Sorry, no support for spaces right now :(");
            return;
        }
        currentText = textInput.value;
        clearTimeoutsAndIntervals();
        animating = false;
        setTimeout(commitResize, 100);
    }
}

function changeSettings(){
    clearTimeoutsAndIntervals();
    animating = false;
    setTimeout(commitResize, 100);
}

function setParticleNumberOptions(values){
    var selector = document.getElementById("particlesSelect");
    if(selector.options.length>0 && parseInt(selector.options[0].value) == values[0] ){
        return;
    }
    while(selector.options.length){
        selector.remove(selector.options.length-1);
    }
    for(var i=0;i <values.length; i++){
        selector.options[i] = new Option(values[i], values[i], i==0, i==0);
    }
}