import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { GET_ALL_GAMES } from '../api/queries';

const ListContainer = styled.div`
  height: 500px;
  width: 500px;

  position: absolute;
  top: 100px;
  left: 250px;
  @media only screen and (max-width: 1040px) {
    left: 10%;
  }
`;

function ListAll() {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_ALL_GAMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    console.log('Data: ', data);
  }
  return (
    <ListContainer>
      <ul>
        {data.games.map((game) => (
          <li
            key={game.id}
            onClick={() => {
              history.push(`/games/${game.id}`);
            }}
          >
            {game.name}
          </li>
        ))}
      </ul>
    </ListContainer>
  );
}

export default ListAll;