import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import LandingPage from './LandingPage';
import { createStore } from 'redux';
import reducer from './reducer';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

const savedFavoriteCharacters = localStorage.getItem('favoriteCharacters');
const initialState = savedFavoriteCharacters
  ? JSON.parse(savedFavoriteCharacters)
  : [];

const store = createStore(reducer, initialState);

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </ApolloProvider>
  )
}

export default App;
