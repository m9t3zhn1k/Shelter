import pets from '../../assets/pets.json';

export default class Pagination {
  sourcePets = pets;
  container = document.querySelector('.gallery__items');
  pageCounter = document.querySelector('.pagination__counter');
  currentPage = 0;
  cardsAmoutPerPage;
  maxPage;
  constructor() {
    this.pets = this.formPetsArray(this.sourcePets);
    this.createPage(this.currentPage, this.pets);
    window.addEventListener('click', this.changePage);
    window.addEventListener('resize', this.reformGallery);
  }
  reformGallery = () => {
    if (this.cardsAmoutPerPage != this.getCardsAmount()) {
      this.pets = this.formPetsArray(this.sourcePets);
      this.currentPage = 0;
      this.createPage(this.currentPage, this.pets);
    }
  }
  formPetsArray = (source) => {
    let result = [];
    let temp = [];
    this.cardsAmoutPerPage = this.getCardsAmount();
    this.maxPage = 48 / this.cardsAmoutPerPage;
    while (temp.length < 48) {
      let array = this.shuffle([...source]);
      array.forEach(item => temp.push(item));
    }
    temp.map((item, index, array) => {
      let currentPage = Math.floor(index / this.cardsAmoutPerPage);
      let currentPageStartIndex = currentPage * this.cardsAmoutPerPage;
      let currentPageLastIndex = currentPageStartIndex + this.cardsAmoutPerPage - 1;
      for (let i = index + 1; i <= currentPageLastIndex; i++) {
        if (item == array[i]) {
          let j = currentPageLastIndex + 1;
          while (item == array[i]) {
            [array[i], array[j]] = [array[j], array[i]];
            if (item == array[i]) {
              j++;
            }
          }
        }
      }
    });
    for (let i = 0; i < temp.length; i = i + this.cardsAmoutPerPage) {
      result.push(temp.slice(i, i + this.cardsAmoutPerPage));
    }
    return result;
  }
  changePage = () => {
    const target = event.target.closest('.pagination__button');
    if (!target) return;
    this.container.classList.add('active');
    let classList = target.classList;
    switch (true) {
      case classList.contains('pagination__button_start'):
        this.currentPage = 0;
        setTimeout(() => this.createPage(this.currentPage, this.pets), 100);
        break;
      case classList.contains('pagination__button_back'):
        --this.currentPage;
        setTimeout(() => this.createPage(this.currentPage, this.pets), 100);
        break;
      case classList.contains('pagination__button_forward'):
        ++this.currentPage;
        setTimeout(() => this.createPage(this.currentPage, this.pets), 100);
        break;
      case classList.contains('pagination__button_end'):
        this.currentPage = this.maxPage - 1;
        setTimeout(() => this.createPage(this.currentPage, this.pets), 100);
        break;
    }
  }
  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  getCardsAmount() {
    return window.innerWidth > 1190 ? 8 : window.innerWidth >= 768 ? 6 : 3;
  }
  createPage = (page, array) => {
    this.container.innerHTML = '';
    let currentPageArray = array[page];
    for (let i = 0; i < this.getCardsAmount(); i++) {
      this.container.append(this.createCard(currentPageArray[i]));
    }
    this.pageCounter.innerHTML = page + 1;
    if (page > 0) {
      document.querySelector('.pagination__button_start').disabled = false;
      document.querySelector('.pagination__button_back').disabled = false;
      document.querySelector('.pagination__button_forward').disabled = false;
      document.querySelector('.pagination__button_end').disabled = false;
    }
    if (page <= 0) {
      document.querySelector('.pagination__button_start').disabled = true;
      document.querySelector('.pagination__button_back').disabled = true;
      document.querySelector('.pagination__button_forward').disabled = false;
      document.querySelector('.pagination__button_end').disabled = false;
    }
    if (page >= this.maxPage - 1) {
      document.querySelector('.pagination__button_forward').disabled = true;
      document.querySelector('.pagination__button_end').disabled = true;
    }
    setTimeout(() => this.container.classList.remove('active'), 100);
  }
  createCard(obj) {
    const card = document.createElement('div');
    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('p');
    const button = document.createElement('button');
    card.className = 'gallery__item';
    imageContainer.className = 'gallery__image';
    name.className = 'gallery__name';
    button.className = 'gallery__button button button__square';
    image.src = obj.img;
    image.alt = obj.name;
    name.textContent = obj.name;
    button.textContent = 'Learn more';
    imageContainer.append(image);
    card.append(imageContainer, name, button);
    return card;
  }
}