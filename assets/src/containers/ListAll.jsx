import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';

import { GET_ALL_GAMES, GET_GAMES_BY_CATEGORY } from '../api/queries';
import { gameListTableContent } from '../content';
import List from '../components/List/List';
import { capitalize } from '../utils';

const useUrlQuery = () => new URLSearchParams(useLocation().search);

function ListAll() {
  const category = useUrlQuery().get('category');
  const dataQuery = category ? GET_GAMES_BY_CATEGORY : GET_ALL_GAMES;
  const { loading, error, data } = useQuery(dataQuery, { variables: { category } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <List
      items={data.gamesByCategory || data.games}
      type="game"
      title={`Upcoming ${(category && `${category && capitalize(category)} `) || ''}Games`}
      contentConfig={gameListTableContent}
      isLoading={loading}
      emptyDataMessage="No matching games were found."
    />
  );
}

export default ListAll;
