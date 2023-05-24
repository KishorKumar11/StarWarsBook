import { Button, Modal } from 'antd';
import React from 'react'
import { Character } from '../data/OnBoarding';
  
interface CharacterDetailsProps {
  character: Character | null;
  onClose: () => void;
}

// CharacterDetails component that renders the details of a character on clicking the character row
const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
  onClose
}) => {
  if (!character) {
    return null; // Render null or placeholder when character is null
  }

  // Assigning character properties
  const { name, height, mass, homeworld, species, gender, eyeColor, filmConnection } = character;

  return (
    <Modal
      title={name || '-'}
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>Height: {height || '-'}</p>
      <p>Weight: {mass || '-'}</p>
      <p>Home Planet: {homeworld?.name || '-'}</p>
      <p>Species: {species?.name || '-'}</p>
      <p>Gender: {gender || '-'}</p>
      <p>Eye color: {eyeColor || '-'}</p>
      <p>Films:</p>
      {/* To display all related films for the chosen character in the modal */}
      {filmConnection?.films.map((film) => (
        <p key={film.title}>{film.title}</p>
      ))}
    </Modal>
  );
};

export default CharacterDetails;