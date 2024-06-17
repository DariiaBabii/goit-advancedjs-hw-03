import { fetchBreeds } from './cat-api.js';

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
let slimSelect;

function initialize() {
  showElement(loader);
  hideElement(error);
  hideElement(catInfo);

  fetchBreeds()
    .then(breeds => {
      selectBreed(breeds);
      hideElement(loader);
    })
    .catch(err => {
      console.error('Error fetching breeds:', err);
      iziToast.error({ title: 'Error', message: 'Failed to fetch breeds' });
      hideElement(loader);
      showElement(error);
    });
}

function selectBreed(breeds) {
  const select = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    select.appendChild(option);
  });

  slimSelect = new SlimSelect({
    select: '.breed-select',
    events: {
      afterChange: newVal => {
        showElement(loader);
        hideElement(catInfo);
        displayBreedInfo(newVal[0].value, breeds);
      },
    },
  });

  showElement(select);
}

function displayBreedInfo(breedId, breeds) {
  const breed = breeds.find(b => b.id === breedId);

  if (breed) {
    catInfo.innerHTML = `
      <h2 class="cat-name">${breed.name}</h2>
      <p class="cat-des">${breed.description}</p>
      <img class="cat-img" src="${breed.image?.url || ''}" alt="${breed.name}">
    `;
    hideElement(loader);
    showElement(catInfo);
  } else {
    catInfo.innerHTML = `<p>Information about this breed is not available.</p>`;
    hideElement(loader);
    showElement(catInfo);
  }
}

function hideElement(element) {
  if (!element.classList.contains('invisible')) {
    element.classList.add('invisible');
  }
}

function showElement(element) {
  if (element.classList.contains('invisible')) {
    element.classList.remove('invisible');
  }
}

initialize();
