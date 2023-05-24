// import React from 'react';
// import { Button } from 'antd';

// interface Character {
//     name: string;
//     height: string;
//     mass: string;
//     homeworld: { name: string };
//     species: { name: string };
//     gender: string;
//     eyeColor: string;
// }

// interface CharacterRowProps {
//   character: Character;
//   onFavoriteToggle: (character: Character) => void;
// }

// const CharacterRow: React.FC<CharacterRowProps> = ({ character, onFavoriteToggle }) => {
//   const handleFavoriteClick = () => {
//     onFavoriteToggle(character);
//   };

//   return (
//     <tr>
//       <td>{character.name}</td>
//       <td>{character.height}</td>
//       <td>{character.mass || '-'}</td>
//       <td>{character.homeworld.name || '-'}</td>
//       <td>{character.species.name || '-'}</td>
//       <td>{character.gender}</td>
//       <td>{character.eyeColor}</td>
//       <td>
//         <Button onClick={handleFavoriteClick}>Favorite</Button>
//       </td>
//     </tr>
//   );
// };

// export default CharacterRow;