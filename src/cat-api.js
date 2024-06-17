// import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_LvKqxJmpYZI2RnaKstuRWeXB02ZQpWFw0LcK4sfAprxF1aWtKZoqIknnFTTlazHd';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      'Error fetching breeds:', error;
      throw error;
    });
}
