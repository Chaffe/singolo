
// // MENU.addEventListener('click', (event) => {
// //   MENU.querySelectorAll('li').forEach(el => el.classlist.remove('active'));
// //   event.target.classlist.add('active');
// // });

// // addMenuClickHandler();
// window.onload = function() {
//   console.log('Hello Rolling Scopes!');

//   addMenuClickHandler();
// }


// const addMenuClickHandler = () => {
//   document.querySelector('.header__navigation__list').addEventListener('click', (e) => {
//     if (e.target.classList.contains('header__navigation__link')){
//       let clickedItem = e.target;
//       removeSelectedLinks();
//       selectClickedItem(clickedItem)
//     }  
//   })
// }

// const removeSelectedLinks = () => {
//   let links = document.querySelectorAll('.header__navigation__list .header__navigation__link')
//   links.forEach(link => {
//     link.classlist.remove('active');
//   })
// }

// const selectClickedItem = (clickedItem) => {
//   clickedItem.classlist.add('active');
// }

const menu = document.querySelector('.header__navigation__list');

const slider = document.querySelectorAll('.slider__content li');
const sliderBg = document.querySelector('.slider');
const buttonPrev = document.querySelector('.slider__arrow_left');
const buttonNext = document.querySelector('.slider__arrow_right');
const sliderScreen = document.querySelectorAll('.slider__phone__screen');
const sliderButton = document.querySelectorAll('.slider__phone__button');

/** Header */

menu.addEventListener('click', (event) => {
  menu.querySelectorAll('li a').forEach(el => el.classList.remove('active'));
  event.target.classList.add('active');
});


/** Slider. Activating phone screens */

sliderScreen.forEach(el => el.onclick = () => {
event.target.classList.toggle('screen-active');
});

sliderButton.forEach((el,i) => el.onclick = () => {
  sliderScreen[i].classList.toggle('screen-active');
});