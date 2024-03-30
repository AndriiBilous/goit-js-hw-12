// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhoto } from './js/pixabay-api';
import { imageTemplates } from './js/render-function';
import { loader } from './js/render-function';
import { error } from './js/render-function';
//========================================================
const imageList = document.querySelector('.image-list');
const form = document.querySelector('.form-search');
form.addEventListener('submit', handlerSubmit);
const loadButton = document.querySelector('.load-more');
loadButton.addEventListener('click', loadMore);
//========================================================

let currentPage = 1;
let query = '';
let maxPage = 0;
const pageSize = 15;
//========================================================
async function handlerSubmit(event) {
  event.preventDefault();

  query = event.target.elements.search.value.trim();

  if (!query) return;

  imageList.innerHTML = '';
  currentPage = 1;

  imageList.insertAdjacentHTML('afterbegin', loader());

  try {
    const data = await getPhoto(query, currentPage);

    maxPage = Math.ceil(data.totalHits / pageSize);

    if (!data.hits.length) {
      imageList.innerHTML = '';
      iziToast.show({
        iconUrl: './img/hide_source.svg',
        position: 'topRight',
        color: 'red',
        messageColor: 'black',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      const markup = imageTemplates(data.hits);
      checkBtnStatus();
      imageList.innerHTML = markup;
      simpleLightBox();
    }
  } catch {
    imageList.insertAdjacentHTML('afterbegin', error());
  }

  event.target.reset();
}
//========================================================
async function loadMore() {
  currentPage += 1;

  imageList.insertAdjacentHTML('afterend', loader());
  const loaderSpan = document.querySelector('.loader');

  const data = await getPhoto(query, currentPage);

  loaderSpan.remove();

  checkBtnStatus();

  const markup = imageTemplates(data.hits);
  imageList.insertAdjacentHTML('beforeend', markup);

  lightScroll();
  simpleLightBox();
}
//========================================================
function simpleLightBox() {
  const lightbox = new SimpleLightbox('.image-link', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}
//========================================================
function checkBtnStatus() {
  if (currentPage >= maxPage) {
    loadButton.classList.add('hidden');
    iziToast.show({
      iconUrl: './img/info_icon.svg',
      position: 'topRight',
      color: 'blue',
      messageColor: 'black',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    loadButton.classList.remove('hidden');
  }
}
//========================================================
function lightScroll() {
  const height = imageList.firstChild.getBoundingClientRect().height;
  scrollBy({
    top: height * 3,
    behavior: 'smooth',
  });
}
