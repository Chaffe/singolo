// HEADER: navigation-item active
// const menu = document.querySelector('.header__navigation__list');
// const divs = document.querySelectorAll('#home, #slider, body > div, #footer');
// const links = document.querySelectorAll('#menu a');

// document.addEventListener('scroll', onScroll);

// function onScroll (event) {
//   const curPos = window.scrollY;
  
//   divs.forEach((el) => {
//     if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
//       links.forEach((a) => {
//         a.classList.remove('active')
//         if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
//           a.classList.add('active');
//         }
//       })
//     }

    
//   });
// }

const MENU = document.getElementById('menu');

MENU.addEventListener('click', event => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    MENU.querySelectorAll('.navigation__link').forEach(el => el.classList.remove('active'));
    event.target.closest('.navigation__link').classList.add('active');

    let sectionId = event.target.getAttribute('href');
    let sectionOffsetTop = document.querySelector(sectionId).offsetTop;
    let headerOffsetHeight = document.querySelector('header').offsetHeight;

    window.scrollTo({
      top: sectionOffsetTop - headerOffsetHeight,
      behavior: 'smooth'
    });
  }
});

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

  changeBg(currentSlide);

  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('next-slide', direction);
    this.classList.add('slide_active');
    isEnabled = true;
  });
}

function changeBg (currentSlide) {
  if (currentSlide) {
    sliderBg.classList.add('bg_blue');
  } else {
    sliderBg.classList.remove('bg_blue');
  }
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

// const portfolioContainer = document.querySelector('.layout-4-column');

// portfolioContainer.addEventListener('click', event => {
//   if (event.target.tagName === 'IMG') {
//     let li = event.target.closest('.layout-4-column__item')

//     if (li.classList.contains('item_active')) {
//       li.classList.remove('item_active');
//     } else {
//       portfolioContainer.querySelectorAll('li').forEach(el => el.classList.remove('item_active'));
//       li.classList.add('item_active');
//     }
//   }
// });

// ----------------------------------------------------

//Interaction with pictures in Portfolio
document.querySelectorAll('.layout-4-column__item').forEach( project => project.addEventListener('click', switchBorder));

function switchBorder(event){
    if(event.target.parentElement.classList.contains('item_active'))
        event.target.parentElement.classList.remove('item_active');
    else{
        document.querySelectorAll('.layout-4-column__item').forEach( project => {
            project.classList.remove('item_active');
        });
        event.target.parentElement.classList.add('item_active');
    }
}

// ----------------------------------------------------

// Form sending
const form = document.getElementById('form');
const submit = document.getElementById('submit');
const modal = document.getElementById('modal');
const modalText = modal.querySelector('.modal__text');
const modalButton = modal.querySelector('.modal__button');

submit.addEventListener('click', event => {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  if (nameInput.checkValidity() && emailInput.checkValidity()) {
    event.preventDefault();

    showModal();
  }
});

function showModal() {
  const subject = document.getElementById('subject').value.toString();
  const message = document.getElementById('message').value.toString();

  let text = '<p>Письмо отправлено</p>';
  text += `<p>${subject ? 'Тема: ' + subject : 'Без темы'}</p>`;
  text += `<p>${message ? 'Описание: ' + message : 'Без описания'}</p>`;

  modalText.innerHTML = text;
  modal.classList.add('modal__overlay_show');
}

modal.addEventListener('click', closeModal);

function closeModal(event) {
  if (event.target === modalButton || event.target === modal) {
    modal.classList.remove('modal__overlay_show');
    modalText.innerHTML = '';
    form.reset();
  }
}


// ----------------------------------------------------