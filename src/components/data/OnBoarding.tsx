import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import CharacterTable from '../ui/CharacterTable';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// GraphQL query to fetch characters
const GET_CHARACTERS = gql`
    query GetCharacters {
        allPeople {
            edges {
                node {
                    name
                    gender
                    height
                    mass
                    species {
                        name
                    }
                    eyeColor
                    homeworld {
                        name
                    }
                    filmConnection {
                        films {
                            title
                        }
                    }
                }
            }
        }
    }
`;

export interface Character {
    name: string;
    height: string;
    mass: string;
    homeworld: { name: string };
    species: { name: string };
    gender: string;
    eyeColor: string;
    filmConnection: { films: { title: string }[] };
}

const OnBoarding: React.FC = () => {
    // Use Apollo Client's useQuery hook to fetch data
    const { loading, error, data } = useQuery(GET_CHARACTERS);

    // State variables to store character data and filter values
    const [characters, setCharacters] = useState<Character[]>([]);
    const [genderFilter, setGenderFilter] = useState<string>('');
    const [eyeColorFilters, setEyeColorFilters] = useState<string[]>([]);
    const [speciesFilters, setSpeciesFilters] = useState<string[]>([]);
    const [filmFilters, setFilmFilters] = useState<string[]>([]);

    // Update the characters state when data is fetched
    useEffect(() => {
        if (data && data.allPeople) {
            const characterData = data.allPeople.edges.map((edge: any) => edge.node);
            setCharacters(characterData);
        }
    }, [data]);

    // Render loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render error message if there is an error
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // Render the CharacterTable component with the fetched characters and filter values
    return (
        <TransitionGroup>
            <CSSTransition classNames="page" timeout={300}>
                <div>
                    <CharacterTable characters={characters} genderFilter={genderFilter} eyeColorFilters={eyeColorFilters} speciesFilters={speciesFilters} filmFilters={filmFilters} />
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default OnBoarding;
