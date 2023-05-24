import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import CharacterTable, { Character } from '../ui/CharacterTable';

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

const LandingPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [genderFilter, setGenderFilter] = useState<string>('');
  const [eyeColorFilters, setEyeColorFilters] = useState<string[]>([]);
  const [speciesFilters, setSpeciesFilters] = useState<string[]>([]);
  const [filmFilters, setFilmFilters] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.allPeople) {
      const characterData = data.allPeople.edges.map(
        (edge: any) => edge.node
      );
      setCharacters(characterData);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <CharacterTable
        characters={characters}
        genderFilter={genderFilter}
        eyeColorFilters={eyeColorFilters}
        speciesFilters={speciesFilters}
        filmFilters={filmFilters}
      />
    </div>
  );
};

export default LandingPage;