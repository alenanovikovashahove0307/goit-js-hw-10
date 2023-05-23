import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const searchRef = document.getElementById('search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

searchRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  let inputCountry = e.target.value.trim();

  if (inputCountry) {
    return fetchCountries(inputCountry)
      .then(data => {
        choseMarkup(data);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }

  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = '';
}

countryListRef.style.listStyle = 'none';
countryListRef.style.margin = '0';
countryListRef.style.padding = '8px';

function choseMarkup(countryArray) {
  if (countryArray.length === 1) {
    countryListRef.innerHTML = '';
    return markupCountry(countryArray);
  }
  if (countryArray.length >= 2 && countryArray.length <= 10) {
    countryInfoRef.innerHTML = '';
    return markupCountryItem(countryArray);
  }

  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
function markupCountryInput(data) {
  const input = data
    .map((element)=> `<input type="text" id="search-box"/>` 
    )
    .join('');

  countryListRef.innerHTML = input;
}

function markupCountryItem(data) {
  const item = data
    .map((element)=> `<li class="country-item">
            <img src="${element.flags.svg}" alt="${element.name.official}" width="40" height="20" /> 
            <p>${element.name.official}</p>
            </li>`
    )
    .join('');

  countryListRef.innerHTML = item;
}

function markupCountry(data) {
  const markup = data
    .map((element) => `<h1>
       <img src="${element.flags.svg}" alt="${element.name.official}
       " width="40" height="20" />           
        ${element.name.official}
      </h1>
      <ul class="country-info_list">
        <li class="country-info_item">
          <h2>Capital:</h2>
          <p>${element.capital}</p>
        </li>
        <li class="country-info_item">
          <h2>Population:</h2>
          <p>${element.population}</p>
        </li>
        <li class="country-info_item">
          <h2>Languages:</h2>
          <p>${Object.values(element.languages).join(', ')}</p>
        </li>
      </ul>`
    )
    .join('');

  countryInfoRef.innerHTML = markup;
}
