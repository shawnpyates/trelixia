import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { GET_GAME } from '../api/queries';
import { formatDate } from '../utils';

const GameContainer = styled.div`
  height: 500px;
  width: 500px;

  position: absolute;
  top: 100px;
  left: 415px;
  @media only screen and (max-width: 1040px) {
    left: 10%;
  }
`;

const Title = styled.h1`
  font-family: Pathway Gothic One;
`;

const Detail = styled.p`
  font-size: 18px;
`;

function ShowGame() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_GAME, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    console.log('Data: ', data);
  }
  const {
    category,
    name,
    questions,
    scheduledFor,
    user: owner,
  } = (data && data.game) || {};
  return (
    <GameContainer>
      <Title>{name}</Title>
      <div>
        <Detail>Host: {owner.username}</Detail>
        <Detail>Scheduled for: {formatDate(scheduledFor)}</Detail>
        <Detail>Category: {category}</Detail>
        <Detail>Number of Questions (subject to change): {questions.length}</Detail>
      </div>
    </GameContainer>
  );
}

export default ShowGame;