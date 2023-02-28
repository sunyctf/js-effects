function clickFunc(e){
  temp = e.target.parentNode.parentNode;
  temp.getElementsByClassName("fillCup")[0].style.animationName = "none";
  temp.getElementsByClassName("coffeeFoam")[0].style.animationName = "none";
  temp.getElementsByClassName("innerWrapper")[0].style.animationName = "none";
  temp.getElementsByClassName("shadowDiv")[0].style.animationName = "none";
  var x = temp.getElementsByClassName("handleDiv");
  for (var i = 0; i < x.length; i++) {
    x[i].style.animationName = "none";
  }
  setTimeout(function(){
    temp.getElementsByClassName("fillCup")[0].style.animationName = "";
    temp.getElementsByClassName("fillCup")[0].style.animationPlayState = "running";
    temp.getElementsByClassName("coffeeFoam")[0].style.animationName = "";
    temp.getElementsByClassName("coffeeFoam")[0].style.animationPlayState = "running";
    temp.getElementsByClassName("innerWrapper")[0].style.animationName = "";
    temp.getElementsByClassName("innerWrapper")[0].style.animationPlayState = "running";
    temp.getElementsByClassName("shadowDiv")[0].style.animationName = "";
    temp.getElementsByClassName("shadowDiv")[0].style.animationPlayState = "running";
    var x = temp.getElementsByClassName("handleDiv");
    for (var i = 0; i < x.length; i++) {
      x[i].style.animationName = "";
      x[i].style.animationPlayState = "running";
    }
  }, 50);

}