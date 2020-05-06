import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_GAME } from '../api/mutations';

const GameContainer = styled.div`
  height: 500px;
  width: 500px;

  position: absolute;
  top: 100px;
  left: 250px;
  @media only screen and (max-width: 1040px) {
    left: 10%;
  }
`;

const placeholderVals = {
  name: 'TriviaGame',
  category: 'general',
  isAutomated: true,
  maxPlayers: 80,
  ownerId: 6,
};

function CreateGame() {
  const [createGame, { data }] = useMutation(CREATE_GAME);

  if (data) {
    console.log('Data::: ', data);
  }

  const handleClick = () => {
    createGame({ variables: placeholderVals });
  };

  return (
    <GameContainer>
      Click to create game:
      <button onClick={handleClick}>
        Create
      </button>
    </GameContainer>
  );
}

export default CreateGame;