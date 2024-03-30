import axios from 'axios';

export async function getPhoto(value, page) {
  const BASE_URL = 'https://pixabay.com/api/?';
  const params = {
    key: '43022470-1213c485ef19c9845e2639418',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };
  const url = `${BASE_URL}`;

  const res = await axios.get(url, { params });
  return res.data;
}
