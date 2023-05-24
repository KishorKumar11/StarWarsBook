import { Button, Modal } from 'antd';
import React from 'react'

interface Character {
    name: string;
    height: string;
    mass: string;
    homeworld: { name: string };
    species: { name: string };
    gender: string;
    eyeColor: string;
    filmConnection: { films: { title: string }[] }
}
  
interface CharacterDetailsProps {
  character: Character | null;
  onClose: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
  onClose
}) => {
  if (!character) {
    return null; // Render null or placeholder when character is null
  }

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
      {filmConnection?.films.map((film) => (
        <p key={film.title}>{film.title}</p>
      ))}
    </Modal>
  );
};

export default CharacterDetails;