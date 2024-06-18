import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const showLoader = () => {
  loader.classList.remove('invisible');
};

const hideLoader = () => {
  loader.classList.add('invisible');
};

const showError = message => {
  errorElement.classList.remove('invisible');
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
};

const hideError = () => {
  errorElement.classList.add('invisible');
};

const loadBreeds = async () => {
  showLoader();
  hideError();
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    new SlimSelect({
      select: breedSelect,
      events: {
        afterChange: newVal => loadCatInfo(newVal[0].value),
      },
    });
    breedSelect.classList.remove('invisible');
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader();
  }
};

const loadCatInfo = async breedId => {
  showLoader();
  hideError();
  catInfo.classList.add('invisible');
  try {
    const cat = await fetchCatByBreed(breedId);
    const { url, breeds } = cat;
    const breed = breeds[0];

    catInfo.innerHTML = `
      <img class="cat-img" src="${url}" alt="${breed.name}" />
      <h2 class="cat-name">${breed.name}</h2>
      <p class="cat-des">${breed.description}</p>
      <p class="cat-des"><strong>Temperament:</strong> ${breed.temperament}</p>
    `;
    catInfo.classList.remove('invisible');
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoader();
  }
};

loadBreeds();
