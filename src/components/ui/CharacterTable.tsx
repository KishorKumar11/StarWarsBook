import React, { useState } from 'react';
import { Table, Button, Space, TableProps } from 'antd';
import { useDispatch } from 'react-redux';
import CharacterDetails from './CharacterDetails';
import { Character } from '../data/OnBoarding';

// Define props interface for the CharacterTable component
export interface CharacterTableProps {
    characters: Character[]; // Array of characters
    genderFilter: string; // Selected gender filter value
    eyeColorFilters: string[]; // Selected eye color filter values
    speciesFilters: string[]; // Selected species filter values
    filmFilters: string[]; // Selected film filter values
}

const CharacterTable: React.FC<CharacterTableProps> = ({ characters, genderFilter, eyeColorFilters, speciesFilters, filmFilters }) => {
    const dispatch = useDispatch();
    const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);

    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [genderFilterValue, setGenderFilterValue] = useState<string | undefined>(genderFilter);
    const [eyeColorFilterValues, setEyeColorFilterValues] = useState<string[]>(eyeColorFilters);
    const [speciesFilterValues, setSpeciesFilterValues] = useState<string[]>(speciesFilters);
    const [filmFilterValues, setFilmFilterValues] = useState<string[]>(filmFilters);
    const [selectedFilmFilter, setSelectedFilmFilter] = useState<string | undefined>(undefined);

    // Function to handle adding/removing character from favorites
    const handleFavoriteToggle = (character: Character) => {
        setFavoriteCharacters((prevFavorites) => {
            if (prevFavorites.includes(character)) {
                return prevFavorites.filter((favCharacter) => favCharacter !== character);
            } else {
                return [...prevFavorites, character];
            }
        });
    };

    // Function to handle row click and show character details modal
    const handleRowClick = (record: Character, event: React.MouseEvent<HTMLElement>) => {
        // Check if the click target is not the "Add to Favorites" button
        if (event.target instanceof HTMLElement && !event.target.closest('.ant-btn')) {
            setSelectedCharacter(record);
        }
    };

    // Function to close the character details modal
    const handleCloseModal = () => {
        setSelectedCharacter(null);
    };

    // Getting unique filter values and preparing filtering option for the table
    const eyeColorValues = Array.from(new Set(characters.map((character) => character.eyeColor)));

    const eyeColorFilter = eyeColorValues.map((color) => ({
        text: color,
        value: color.toLowerCase().replace(/\s+/g, '-') // Used to replace one or more whitespace characters (\s+) with a hyphen (-)
    }));

    const speciesValues = Array.from(new Set(characters.map((character) => character.species?.name).filter(Boolean)));

    const speciesFilter = speciesValues.map((species) => ({
        text: species,
        value: species ? species.toLowerCase().replace(/\s+/g, '-') : ''
    }));

    const filmValues = Array.from(new Set(characters.flatMap((character) => character.filmConnection.films.map((film) => film.title))));

    const filmFilter = filmValues.map((film) => ({
        text: film,
        value: film
    }));

    // Define table columns
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string | null) => <td style={{ background: '#F0F8FF', borderRadius: 25, padding: 5 }}>{text || '-'}</td>
        },
        {
            title: 'Height',
            dataIndex: 'height',
            key: 'height',
            render: (text: string | null) => text || '-'
        },
        {
            title: 'Weight',
            dataIndex: 'mass',
            key: 'mass',
            render: (text: string | null) => text || '-'
        },
        {
            title: 'Home Planet',
            dataIndex: ['homeworld', 'name'],
            key: 'homeworld',
            render: (text: string | null) => text || '-'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
                { text: 'N/A', value: 'n/a' }
            ],
            filteredValue: genderFilterValue ? [genderFilterValue] : undefined,
            onFilter: (value: string | number | boolean, record: Character) => record.gender === value.toString(),
            render: (text: string | null) => text || '-'
        },
        {
            title: 'Eye Color',
            dataIndex: 'eyeColor',
            key: 'eyeColor',
            filters: eyeColorFilter,
            filteredValue: eyeColorFilterValues.length > 0 ? eyeColorFilterValues : undefined,
            onFilter: (value: string | number | boolean, record: Character) => {
                const filterValues = value
                    .toString()
                    .split(',')
                    .map((val) => val.trim().toLowerCase());
                return filterValues.some((filterValue) => record.eyeColor.trim().toLowerCase().includes(filterValue));
            },
            render: (text: string | null) => text || '-'
        },
        {
            title: 'Species',
            dataIndex: ['species', 'name'],
            key: 'species',
            filters: speciesFilter,
            filteredValue: speciesFilterValues.length > 0 ? speciesFilterValues : undefined,
            onFilter: (value: string | number | boolean, record: Character) => record.species && record.species.name?.toLowerCase().replace(/\s+/g, '-') === value.toString(),
            render: (text: string | null) => text || '-'
        },
        {
            title: 'Films',
            dataIndex: 'filmConnection',
            key: 'films',
            filters: filmFilter,
            filteredValue: selectedFilmFilter ? [selectedFilmFilter] : undefined,
            onFilter: (value: string | number | boolean, record: Character) => record.filmConnection.films.some((films) => films.title === value),
            render: (filmConnection: { films: { title: string }[] }) => filmConnection.films.map((films) => films.title).join(', ')
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Character) => (
                <Space size="middle">
                    <Button onClick={() => handleFavoriteToggle(record)}>{favoriteCharacters && favoriteCharacters.includes(record) ? 'Remove from Favorites' : 'Add to Favorites'}</Button>
                </Space>
            )
        }
    ];

    let filteredCharacters = characters;

    // Apply filters
    if (favoritesOnly) {
        filteredCharacters = filteredCharacters.filter((character) => favoriteCharacters?.includes(character));
    }
    if (genderFilterValue) {
        filteredCharacters = filteredCharacters.filter((character) => character.gender === genderFilterValue);
    }

    if (eyeColorFilterValues.length > 0) {
        filteredCharacters = filteredCharacters.filter((character) => eyeColorFilterValues.includes(character.eyeColor));
    }

    if (speciesFilterValues.length > 0) {
        filteredCharacters = filteredCharacters.filter((character) => speciesFilterValues.includes(character.species.name));
    }

    if (filmFilterValues.length > 0) {
        filteredCharacters = filteredCharacters.filter((character) => character.filmConnection.films.some((film) => filmFilterValues.includes(film.title)));
    }

    // Function to handle table onChange event
    const onChange: TableProps<Character>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    // Function to generate row class names for alternate rows
    const generateRowClassName = (record: Character, index: number): string => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    return (
        <div>
            <Space>
                <Button.Group>
                    <Button onClick={() => setFavoritesOnly(!favoritesOnly)}>{favoritesOnly ? 'Show All Characters' : 'Show Favorites Only'}</Button>
                    <Button onClick={() => setFavoriteCharacters([])}>Clear Selection</Button>
                </Button.Group>
            </Space>
            <Table
                columns={columns}
                dataSource={filteredCharacters}
                onRow={(record: Character) => ({
                    onClick: (event: React.MouseEvent<HTMLElement>) => handleRowClick(record, event)
                })}
                rowClassName={generateRowClassName}
                onChange={onChange}
            />
            {selectedCharacter && <CharacterDetails character={selectedCharacter} onClose={handleCloseModal} />}
        </div>
    );
};

export default CharacterTable;
