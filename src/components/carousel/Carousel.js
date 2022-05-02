import pets from '../../assets/pets.json';

export default class Carousel {
  pets = pets;
  slidesPack = [];
  lastSlidesPack = [];
  constructor(slidesContainer, leftButton, rightButton) {
    this.slidesContainer = slidesContainer;
    this.leftButton = leftButton;
    this.rightButton = rightButton;
    this.slidesAmoutPerPage = this.getSlidesAmount();
    this.showSlides();
    window.addEventListener('resize', this.reformCarousel);
    this.rightButton.addEventListener('click', this.nextSlidesRight);
    this.leftButton.addEventListener('click', this.nextSlidesLeft);
  }
  showSlides = () => {
    const slidesPackActive = this.slidesContainer.children[1];
    slidesPackActive.innerHTML = '';
    const slidesAmount = this.getSlidesAmount();
    this.lastSlidesPack = this.slidesPack;
    this.slidesPack = this.formPetsPack(slidesAmount);
    for (let i = 0; i < this.slidesPack.length; i++) {
      slidesPackActive.append(this.createSlide(this.slidesPack[i]));
    }
  }
  reformCarousel = () => {
    if (this.slidesAmoutPerPage != this.getSlidesAmount()) {
      this.slidesAmoutPerPage = this.getSlidesAmount();
      this.showSlides();
    }
  }
  nextSlidesLeft = () => {
    this.nextSlides('left');
  }
  nextSlidesRight = () => {
    this.nextSlides('right');
  }
  nextSlides = (direction) => {
    const slidesPackActive = this.slidesContainer.children[1];
    let slidesPackOpen;
    let slidesPackDelete;
    const slidesPackNew = document.createElement('div');
    slidesPackNew.className = 'slider__slides slider__slides_new';
    this.rightButton.removeEventListener('click', this.nextSlidesRight);
    this.leftButton.removeEventListener('click', this.nextSlidesLeft);
    setTimeout(() => {
      switch (direction) {
        case 'left':
          slidesPackOpen = slidesPackActive.nextElementSibling;
          slidesPackDelete = slidesPackActive.previousElementSibling;
          this.slidesContainer.append(slidesPackNew);
          this.slidesContainer.children[3].classList.remove('slider__slides_new');
          this.slidesContainer.children[1].style.opacity = '0';
          break;
        case 'right':
          slidesPackOpen = slidesPackActive.previousElementSibling;
          slidesPackDelete = slidesPackActive.nextElementSibling;
          this.slidesContainer.prepend(slidesPackNew);
          this.slidesContainer.children[0].classList.remove('slider__slides_new');
          this.slidesContainer.children[2].style.opacity = '0';
          break;
      }
      slidesPackOpen.innerHTML = this.createNewSlidesPack().innerHTML;
      slidesPackDelete.classList.add('slider__slides_delete');
      
    }, 0);
    setTimeout(() => {
      slidesPackDelete.remove();
      slidesPackActive.className = 'slider__slides';
      slidesPackActive.innerHTML = '';
      document.querySelectorAll('.slider__slides').forEach(item => item.removeAttribute('style'));
      this.rightButton.addEventListener('click', this.nextSlidesRight);
      this.leftButton.addEventListener('click', this.nextSlidesLeft);
    }, 500);
  }
  createNewSlidesPack = () => {
    let pack = document.createElement('div');
    pack.className = 'slider__slides slider__slides_new';
    const slidesAmount = this.getSlidesAmount();
    this.lastSlidesPack = this.slidesPack;
    this.slidesPack = this.formPetsPack(slidesAmount);
    for (let i = 0; i < this.slidesPack.length; i++) {
      pack.append(this.createSlide(this.slidesPack[i]));
    }
    return pack;
  }
  formPetsPack = (amount) => {
    let array = [];
    while (array.length < amount) {
      let randomNumber = Math.ceil(Math.random() * this.pets.length) - 1;
      let randomPet = this.pets[randomNumber];
      if (array.includes(randomPet) || this.lastSlidesPack.includes(randomPet)) {
        continue;
      }
      array.push(randomPet);
    }
    return array;
  }
  getSlidesAmount() {
    return window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  }
  createSlide(obj) {
    const slide = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('p');
    const button = document.createElement('button');
    slide.className = 'slider__slide';
    image.className = 'slider__image';
    name.className = 'slider__name';
    button.className = 'slider__button button button__square';
    image.src = obj.img;
    image.alt = obj.name;
    name.textContent = obj.name;
    button.textContent = 'Learn more';
    slide.append(image);
    slide.append(name);
    slide.append(button);
    return slide;
  }
}