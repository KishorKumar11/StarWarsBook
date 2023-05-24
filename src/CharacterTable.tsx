import React, { useState } from 'react';
import { Table, Button, Space, TableProps } from 'antd';
import { CombinedState } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from './action';
import { RootState } from './store';
import CharacterDetails from './CharacterDetails';

export interface Character {
  name: string;
  height: string;
  mass: string;
  homeworld: { name: string };
  species: { name: string };
  gender: string;
  eyeColor: string;
  filmConnection: { films: { title: string }[] }
}

export interface CharacterTableProps {
  characters: Character[];
  genderFilter: string;
  eyeColorFilters: string[];
  speciesFilters: string[];
  filmFilters: string[];
  onGenderFilterChange: (selectedFilter: string) => void;
  onEyeColorFilterChange: (selectedFilters: string[]) => void;
  onSpeciesFilterChange: (selectedFilters: string[]) => void;
  onFilmFilterChange: (selectedFilters: string[]) => void;
}

const CharacterTable: React.FC<CharacterTableProps> = ({
  characters,
  genderFilter,
  eyeColorFilters,
  speciesFilters,
  filmFilters,
  onGenderFilterChange,
  onEyeColorFilterChange,
  onSpeciesFilterChange,
  onFilmFilterChange,
}) => {
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state: RootState) => state.favoriteCharacters);

  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [genderFilterValue, setGenderFilterValue] = useState<string | undefined>(genderFilter);
  const [eyeColorFilterValues, setEyeColorFilterValues] = useState<string[]>(eyeColorFilters);
  const [speciesFilterValues, setSpeciesFilterValues] = useState<string[]>(speciesFilters);
  const [filmFilterValues, setfilmFilterValues] = useState<string[]>(filmFilters);
  const [selectedFilmFilter, setSelectedFilmFilter] = useState<string | undefined>(undefined);


  const handleFavoriteToggle = (character: Character) => {
    const isFavorite = favoriteCharacters.includes(character);
    if (isFavorite) {
      dispatch(toggleFavorite(character));
    }
  };

  const handleRowClick = (record: Character) => {
    setSelectedCharacter(record);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const eyeColorValues = Array.from(new Set(characters.map((character) => character.eyeColor)));

  const eyeColorFilter = eyeColorValues.map((color) => ({
    text: color,
    value: color.toLowerCase().replace(/\s+/g, '-'),
  }));

  const speciesValues = Array.from(new Set(characters.map((character) => character.species?.name).filter(Boolean)));

  const speciesFilter = speciesValues.map((species) => ({
    text: species,
    value: species ? species.toLowerCase().replace(/\s+/g, '-') : '',
  }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string | null) => text || '-',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      render: (text: string | null) => text || '-',
    },
    {
      title: 'Weight',
      dataIndex: 'mass',
      key: 'mass',
      render: (text: string | null) => text || '-',
    },
    {
      title: 'Home Planet',
      dataIndex: ['homeworld', 'name'],
      key: 'homeworld',
      render: (text: string | null) => text || '-',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
        { text: 'N/A', value: 'n/a' },
      ],
      filteredValue: genderFilterValue ? [genderFilterValue] : undefined,
      onFilter: (value: string | number | boolean, record: Character) =>
        record.gender === value.toString(),
      render: (text: string | null) => text || '-',
    },
    {
      title: 'Eye Color',
      dataIndex: 'eyeColor',
      key: 'eyeColor',
      filters: eyeColorFilter,
      filteredValue: eyeColorFilterValues.length > 0 ? eyeColorFilterValues : undefined,
      onFilter: (value: string | number | boolean, record: Character) =>
        record.eyeColor === value.toString(),
      render: (text: string | null) => text || '-',
    },
    {
      title: 'Species',
      dataIndex: ['species', 'name'],
      key: 'species',
      filters: speciesFilter,
      filteredValue: speciesFilterValues.length > 0 ? speciesFilterValues : undefined,
      onFilter: (value: string | number | boolean, record: Character) =>
        record.species && record.species.name === value.toString(),     
      render: (text: string | null) => text || '-',
    },
    {
      title: 'Films',
      dataIndex: 'filmConnection',
      key: 'films',
      filters: filmFilters.map((film) => ({ text: film, value: film })),
      filteredValue: selectedFilmFilter ? [selectedFilmFilter] : undefined,
      onFilter: (value: string | number | boolean, record: Character) =>
        record.filmConnection.films.some((film) => film.title === value),
      render: (filmConnection: { films: { title: string }[] }) =>
        filmConnection.films.map((film) => film.title).join(', '),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Character) => (
        <Space size="middle">
          <Button onClick={() => handleFavoriteToggle(record)}>
          {favoriteCharacters && favoriteCharacters.includes(record) ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </Space>
      ),
    },
  ];

  let filteredCharacters = characters;

  // Apply filters
  if (favoritesOnly) {
    filteredCharacters = filteredCharacters.filter((character) =>
      favoriteCharacters?.includes(character)
    );
  }
  if (genderFilterValue) {
    filteredCharacters = filteredCharacters.filter((character) =>
      character.gender === genderFilterValue
    );
  }

  if (eyeColorFilterValues.length > 0) {
    filteredCharacters = filteredCharacters.filter((character) =>
      eyeColorFilterValues.includes(character.eyeColor)
    );
  }

  if (speciesFilterValues.length > 0) {
    filteredCharacters = filteredCharacters.filter((character) =>
      speciesFilterValues.includes(character.species.name)
    );
  }

  if (filmFilterValues.length > 0) {
    filteredCharacters = filteredCharacters.filter((character) =>
      character.filmConnection.films.some((film) =>
        filmFilterValues.includes(film.title)
      )
    );
  }

  const onChange: TableProps<Character>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Space>
        <Button.Group>
          <Button onClick={() => setFavoritesOnly(!favoritesOnly)}>
            {favoritesOnly ? 'Show All Characters' : 'Show Favorites Only'}
          </Button>
          <Button onClick={() => setSelectedCharacter(null)}>Clear Selection</Button>
        </Button.Group>
        <Button.Group style={{ marginLeft: 8 }}>
          <Button onClick={() => setfilmFilterValues([])}>Clear Films</Button>
          {/* {filmFilters.map((film) => (
            <Button
              key={film}
              onClick={() => onFilmFilterChange(film)}
              type={selectedFilmFilter === film ? 'primary' : 'default'}
            >
              {film}
            </Button>
          ))} */}
        </Button.Group>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredCharacters}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        onChange={onChange}
      />
      {selectedCharacter && (
        <CharacterDetails character={selectedCharacter} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CharacterTable;