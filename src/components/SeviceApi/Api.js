import axios from 'axios';
const apiKey = '29834380-00058cdf7f3ce3b5b4cca9ee7';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (imageQuery, page = 1) => {
  const response = await axios.get('', {
    params: {
      q: imageQuery,
      page: page,
      key: apiKey,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
};
