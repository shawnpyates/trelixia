import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { GET_GAME } from '../api/queries';

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

function ShowGame() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_GAME, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    console.log('Data: ', data);
  }
  return (
    <GameContainer>{data.game.name}</GameContainer>
  );
}

export default ShowGame;