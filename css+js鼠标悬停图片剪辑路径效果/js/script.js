const items = Array.from(document.querySelectorAll('.item'));

const onMouseOut = ({ target: item }) => item.classList.add('go-back');
const onMouseOver = ({ target: item }) => item.classList.remove('go-back');
const onAnimationEnd = ({ target: item }) => {
  console.log('enenened');
  item.classList.remove('go-back')
};

items.forEach((item) => {
  item.addEventListener('mouseover', onMouseOver);
  item.addEventListener('mouseout', onMouseOut);
  item.addEventListener('animationend', onAnimationEnd)
});