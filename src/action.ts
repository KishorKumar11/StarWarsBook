// actions.ts
interface Character {
    name: string;
    height: string;
    mass: string;
    homeworld: { name: string };
    species: { name: string };
    gender: string;
    eyeColor: string;
  }

// Action Types
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

// Action Creators
export const toggleFavorite = (character: Character) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: character,
  };
};






