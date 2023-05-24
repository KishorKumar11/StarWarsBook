import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createStore } from 'redux';
import reducer from './misc/reducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OnBoarding from './components/data/OnBoarding';
import LandingPage from './components/ui/LandingPage';

const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache()
});

const savedFavoriteCharacters = localStorage.getItem('favoriteCharacters');
const initialState = savedFavoriteCharacters ? JSON.parse(savedFavoriteCharacters) : [];

const store = createStore(reducer, initialState);

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/onboarding" element={<OnBoarding />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ApolloProvider>
    );
};

export default App;
