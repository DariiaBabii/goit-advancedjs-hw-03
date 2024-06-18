// import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_LvKqxJmpYZI2RnaKstuRWeXB02ZQpWFw0LcK4sfAprxF1aWtKZoqIknnFTTlazHd';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
};

export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    throw new Error('Failed to fetch cat information');
  }
};
