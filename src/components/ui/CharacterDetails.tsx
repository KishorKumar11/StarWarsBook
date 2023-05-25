import { Button, Modal } from 'antd';
import React from 'react';
import { Character } from '../data/OnBoarding';

interface CharacterDetailsProps {
    character: Character | null;
    onClose: () => void;
}

// CharacterDetails component that renders the details of a character on clicking the character row
const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character, onClose }) => {
    if (!character) {
        return null; // Render null or placeholder when character is null
    }

    // Assigning character properties
    const { name, height, mass, homeworld, species, gender, eyeColor, filmConnection } = character;

    return (
        <Modal
            title={<h3>{name || '-'}</h3>}
            visible={true}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>
            ]}
        >
            <p>
                <b>Height:</b> {height || '-'}
            </p>
            <p>
                <b>Weight:</b> {mass || '-'}
            </p>
            <p>
                <b>Home Planet:</b> {homeworld?.name || '-'}
            </p>
            <p>
                <b>Species:</b> {species?.name || '-'}
            </p>
            <p>
                <b>Gender:</b> {gender || '-'}
            </p>
            <p>
                <b>Eye color:</b> {eyeColor || '-'}
            </p>
            <p>
                <b>Films:</b>
            </p>
            {/* To display all related films for the chosen character in the modal */}
            {filmConnection?.films.map((film) => (
                <p key={film.title}>{film.title}</p>
            ))}
        </Modal>
    );
};

export default CharacterDetails;
