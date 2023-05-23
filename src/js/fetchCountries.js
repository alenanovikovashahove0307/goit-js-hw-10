const URL_NAME = 'https://restcountries.herokuapp.com/api/v1';
const FIELDS = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL_NAME}${name}?fields=${FIELDS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
