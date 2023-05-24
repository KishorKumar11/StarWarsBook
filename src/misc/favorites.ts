export interface Character {
    id: string;
    name: string;
    height: string;
    mass: string;
    homeworld: { name: string };
    species: { name: string };
    gender: string;
    eyeColor: string;
    filmConnection: { films: { title: string }[] };
    favorite: boolean;
}

const FAVORITES_KEY = 'favoriteCharacters';

export function getFavoriteCharacters() {
    const favorites = localStorage.getItem('favoriteCharacters');
    return favorites ? JSON.parse(favorites) : [];
  }
  
  export function addFavoriteCharacter(characterId: string) {
    const favorites = getFavoriteCharacters();
    favorites.push(characterId);
    localStorage.setItem('favoriteCharacters', JSON.stringify(favorites));
  }
  
  export function removeFavoriteCharacter(characterId: string) {
    const favorites = getFavoriteCharacters();
    const index = favorites.indexOf(characterId);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favoriteCharacters', JSON.stringify(favorites));
    }
  }
  