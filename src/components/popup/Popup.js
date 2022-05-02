import pets from '../../assets/pets.json';

export default class Popup {
  pets = pets;
  constructor() {
    window.addEventListener('click', this.checkClick);
  }
  checkClick = () => {
    const target = event.target.closest('.slider__slide') || event.target.closest('.gallery__item');
    if (!target) return;
    const pet = this.pets.find(item => item.name === target.querySelector('.slider__name')?.textContent || item.name === target.querySelector('.gallery__name')?.textContent);
    this.openPopup(pet);
  }
  openPopup = (pet) => {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
    console.log(`-${window.scrollY}px`)
    const popup = this.formPopup(pet);
    document.body.append(popup);
    setTimeout(() => popup.classList.add('active'), 0);
    window.addEventListener('click', this.closePopup);
  }
  formPopup(pet) {
    const popup = document.createElement('div');
    const popupBody = document.createElement('div');
    const buttonClose  =document.createElement('button');
    const image = document.createElement('img');
    const popupContent = document.createElement('div');
    const title = document.createElement('h3');
    const subtitle = document.createElement('h4');
    const description = document.createElement('p');
    const list = document.createElement('ul');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    const li4 = document.createElement('li');
    popup.className = 'popup';
    popupBody.className = 'popup__body';
    buttonClose.className = 'popup__button';
    image.className = 'popup__image';
    popupContent.className = 'popup__content';
    title.className = 'popup__title';
    subtitle.className = 'popup__subtitle';
    description.className = 'popup__description';
    list.className = 'popup__list';
    image.src = pet.img;
    image.alt = pet.name;
    title.textContent = pet.name;
    subtitle.textContent = pet.type + ' - ' + pet.breed;
    description.textContent = pet.description;
    li1.innerHTML = `<span><b>Age:</b> ${pet.age}</span>`;
    li2.innerHTML = `<span><b>Inoculations:</b> ${pet.inoculations.join(', ')}</span>`;
    li3.innerHTML = `<span><b>Diseases:</b> ${pet.diseases.join(', ')}</span>`;
    li4.innerHTML = `<span><b>Parasites:</b> ${pet.parasites.join(', ')}</span>`;
    list.append(li1, li2, li3, li4);
    popupContent.append(title, subtitle, description, list);
    popupBody.append(buttonClose, image, popupContent);
    popup.append(popupBody);
    return popup;
  }
  closePopup = () => {
    const target = event.target.classList.contains('popup') || event.target.classList.contains('popup__button');
    if (!target) return;
    document.querySelector('.popup').classList.remove('active');
    window.removeEventListener('click', this.closePopup);
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    setTimeout(() => document.querySelector('.popup').remove(), 250);
  }
}