// HEADER: navigation-item active
const menu = document.querySelector('.header__navigation__list');
const divs = document.querySelectorAll('#home, #slider, body > div, #footer');
const links = document.querySelectorAll('#menu a');

document.addEventListener('scroll', onScroll);

function onScroll (event) {
  const curPos = window.scrollY;
  
  divs.forEach((el) => {
    if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
      links.forEach((a) => {
        a.classList.remove('active')
        if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('active');
        }
      })
    }

    
  });
}

// ----------------------------------------------------

// Slider: activating phone-screen
const sliderScreen = document.querySelectorAll('.slider__phone__screen');
const sliderButton = document.querySelectorAll('.slider__phone__button');

sliderScreen.forEach(el => el.onclick = () => {
event.target.classList.toggle('screen-active');
});

sliderButton.forEach((el,i) => el.onclick = () => {
  sliderScreen[i].classList.toggle('screen-active');
});


// ----------------------------------------------------

// Slider: swipe slides
const sliderBg = document.querySelector('.slider');
const buttonPrev = document.querySelector('.slider__arrow_left');
const buttonNext = document.querySelector('.slider__arrow_right');
const slides = document.querySelectorAll('.slide')

let currentSlide = 0;
let isEnabled = true;


buttonPrev.addEventListener('click', () => {
  if (isEnabled) {
    previousSlide(currentSlide);
  }
})

buttonNext.addEventListener('click', () => {
  if (isEnabled) {
    nextSlide(currentSlide);
  }
})

function previousSlide(currentSlide) {
  hideSlide('to-right');
  changecurrentSlide(currentSlide - 1);
  showSlide('from-left');
}

function nextSlide(currentSlide) {
  hideSlide('to-left');
  changecurrentSlide(currentSlide + 1);
  showSlide('from-right');
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('slide_active', direction);
  });
}

function changecurrentSlide (newSlide) {
  return currentSlide = (slides.length + newSlide) % slides.length;
}

function showSlide (direction) {
  slides[currentSlide].classList.add('next-slide', direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('next-slide', direction);
    this.classList.add('slide_active');
    isEnabled = true;
  });
}

function changeBg (currentSlide) {
  // if(currentSlide % 2 == 0) {
  //   sliderBg.style.backgroundColor = '#f06c64';
  // } else {
  //   slider.style.backgroundColor = '#648BF0';
  // }
}

// ----------------------------------------------------

// Mixing in Portfolio
const portfolioTags = document.querySelector('.portfolio__tags');

portfolioTags.addEventListener('click', event => {
  if (event.target.className === 'tag' && !event.target.classList.contains('tag_selected')) {
    portfolioTags.querySelectorAll('.tag').forEach(el => el.classList.remove('tag_selected'));
    event.target.classList.add('tag_selected');

    mixItems();
  }
});

function mixItems() {
  let items = [...document.querySelectorAll('.layout-4-column__item')];
  let itemsContainer = document.querySelector('.layout-4-column');
  let fragment = document.createDocumentFragment();

  while (items.length) {
    let img = items.splice(Math.floor(Math.random() * items.length), 1)[0];
    fragment.append(img);
  }

  itemsContainer.append(fragment);
}

const portfolioContainer = document.querySelector('.layout-4-column');

portfolioContainer.addEventListener('click', event => {
  if (event.target.tagName === 'IMG') {
    let li = event.target.closest('.layout-4-column__item')

    if (li.classList.contains('item_active')) {
      li.classList.remove('item_active');
    } else {
      portfolioContainer.querySelectorAll('li').forEach(el => el.classList.remove('item_active'));
      li.classList.add('item_active');
    }
  }
});

// ----------------------------------------------------