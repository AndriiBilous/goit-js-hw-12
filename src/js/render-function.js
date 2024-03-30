function imageTemplate({
  webformatURL,
  tags,
  views,
  likes,
  comments,
  downloads,
  largeImageURL,
}) {
  return `<li class="image-item">
  <a class="image-link" href="${largeImageURL}">
  <img loading = "lazy" src="${webformatURL}" alt="${tags}" width ="300" height="200" ></a>
  <div class="tex-container">
  <p class="image-text">Likes <span class="span-text">${likes}</span></p>
  <p class="image-text">Views <span class="span-text">${views}</span></p>
  <p class="image-text">Comments <span class="span-text">${comments}</span></p>
  <p class="image-text">Downloads <span class="span-text">${downloads}</span></p>
  </div>
</li>`;
}
export function imageTemplates(arr) {
  return arr.map(imageTemplate).join('');
}

export function loader() {
  return `<span class="loader">Loading</span>`;
}

export function error() {
  return `<span class="error">ERROR</span>`;
}
