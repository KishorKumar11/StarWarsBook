import { Character } from './favorites';

type Action = {
  type: string;
  payload: Character;
};

const initialState: Character[] = [];

const charactersReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const character = action.payload;
      const index = state.findIndex((c) => c.name === character.name);
      if (index !== -1) {
        // Character already exists, remove it
        return state.filter((c, i) => i !== index);
      } else {
        // Character doesn't exist, add it
        return [...state, character];
      }
    default:
      return state;
  }
};

export default charactersReducer;
