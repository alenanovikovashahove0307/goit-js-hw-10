export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds.');
      }
      return response.json();
    })
    .then(data => data.map(breed => ({ value: breed.id, text: breed.name })));
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat information.');
      }
      return response.json();
    })
    .then(data => {
      const catData = data[0];
      const breedName = catData.breeds[0].name;
      const description = catData.breeds[0].description;
      const temperament = catData.breeds[0].temperament;
      const imageUrl = catData.url;
      return { breedName, description, temperament, imageUrl };
    });
}
