import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { GET_ALL_GAMES } from '../api/queries';
import { list as listConfig } from '../content.json';
import List from '../components/List/List';

function ListAll() {
  const { loading, error, data } = useQuery(GET_ALL_GAMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    console.log('Data: ', data);
  }
  return (
    <List
      items={data.games}
      type="game"
      title="Upcoming Games"
      contentConfig={listConfig}
      isLoading={loading}
      emptyDataMessage="No matching games were found."
    />
  );
}

export default ListAll;