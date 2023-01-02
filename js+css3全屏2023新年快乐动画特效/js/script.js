const stars = () => {
  const count = 200;
  const section = document.querySelector('.section');
  let i = 0;
  while (i < count) {
    const star = document.createElement('i');
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    
    const size = Math.random() * 4;
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.width = 1 + size + 'px';
    star.style.height = 1 + size + 'px';
    
    const duration = Math.random() * 2;
    
    // 设置持续时间
    // js中除了减法计算之外，不允许随便写-。因为会混淆。所以，DOM标准规定，所有带-的css属性名，一律去横线变驼峰
    // css属性animation-duration,在js中改写为驼峰形式：animationDuration
    star.style.animationDuration = 2 + duration + 's';
    // 设置延迟 
    star.style.animationDelay = 2 + duration + 's';
    // 把新创建的节点追加到父元素下所有直接子元素的结尾
    section.appendChild(star);
    i++;
  }
}

stars();