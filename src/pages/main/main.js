import './main.scss';
import Carousel from '../../components/carousel/Carousel';
import Popup from '../../components/popup/Popup';

const burgerIcon = document.querySelector('.burger__icon');
const logo = document.querySelector('.header__logo');
const links = document.querySelector('.nav__items');
const slidesContainer = document.querySelector('.slider__slides-container');
const leftButton = document.querySelector('.slider__left-arrow');
const rightButton = document.querySelector('.slider__right-arrow');

const carousel = new Carousel(slidesContainer, leftButton, rightButton);
const popup = new Popup();

let isBurgerMenuOpened = false;

burgerIcon.addEventListener('click', toggleBurgerMenu);
window.addEventListener('click', checkClick);
window.addEventListener('resize', checkWidth);

function hideLogo() {
  logo.classList.toggle('hidden');
}

function toggleBurgerMenu() {
  burgerIcon.classList.toggle('active');
  hideLogo();
  if (!isBurgerMenuOpened) {
    openBurgerMenu();
  } else {
    closeBurgerMenu();
  }
  isBurgerMenuOpened = !isBurgerMenuOpened;
}

function openBurgerMenu() {
  const burgerContainer = document.createElement('div');
  const burgerMenu = document.createElement('div');
  const burgerArea = document.createElement('div');
  burgerContainer.classList.add('burger');
  burgerMenu.classList.add('burger__menu');
  burgerArea.classList.add('burger__area');
  burgerMenu.append(logo.cloneNode(true));
  burgerMenu.append(links.cloneNode(true));
  burgerMenu.firstElementChild.className = 'header__logo logo';
  burgerContainer.append(burgerArea);
  burgerContainer.append(burgerMenu);
  document.body.append(burgerContainer);
  document.querySelector('.header').append(burgerContainer);
  document.body.style.overflowY = 'hidden';
  setTimeout(() => burgerContainer.classList.toggle('active'), 0);
}

function closeBurgerMenu() {
  const burgerContainer = document.querySelector('.burger');
  burgerContainer.classList.toggle('active');
  document.body.style.overflowY = 'scroll';
  setTimeout(() => burgerContainer.remove(), 250);
}

function checkClick() {
  const target = event.target;
  if (!target || window.innerWidth >= 768) return;
  if (target.closest('.nav__link') || target.closest('.burger__area')) {
    toggleBurgerMenu();
  }
}

function checkWidth() {
  if (window.innerWidth > 767 && isBurgerMenuOpened === true) {
    isBurgerMenuOpened = false;
    const burgerContainer = document.querySelector('.burger');
    burgerIcon.classList.remove('active');
    logo.classList.remove('hidden');
    document.body.style.overflowY = 'scroll';
    burgerContainer.remove();
  }
}