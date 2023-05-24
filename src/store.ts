import { createStore, combineReducers } from 'redux';
import charactersReducer from './reducer';
import favoriteCharactersReducer from './reducerfav';

const rootReducer = combineReducers({
  characters: charactersReducer,
  favoriteCharacters: favoriteCharactersReducer,
});

const store = createStore(rootReducer);

export default store;

export type RootState = ReturnType<typeof rootReducer>;
