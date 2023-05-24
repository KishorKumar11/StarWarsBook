import { Character } from './favorites'; // Assuming Character interface is defined in the same file

const initialState: Character[] = []; // Initial state is an empty array

const favoriteCharactersReducer = (state = initialState, action: any) => {
  // Handle different actions if necessary
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const character = action.payload;
      const index = state.findIndex((c: Character) => c.name === character.name);
      
      if (index !== -1) {
        // Character already exists, remove it from favorites
        return state.filter((c: Character) => c.name !== character.name);
      } else {
        // Character does not exist, add it to favorites
        return [...state, character];
      }
    }
    default:
      return state;
  }
};

export default favoriteCharactersReducer;
