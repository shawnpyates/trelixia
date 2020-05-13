import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';

import { GET_ALL_GAMES, GET_GAMES_BY_CATEGORY, GET_GAMES_BY_USER_FAVORITE } from '../api/queries';
import { gameListTableContent } from '../content';
import List from '../components/List/List';
import { capitalize } from '../utils';
import { UserContext } from '../context/userContext';

const useUrlQuery = () => new URLSearchParams(useLocation().search);

const buildQuery = (userId, urlQuery) => {
  const category = urlQuery().get('category');
  const bookmarked = urlQuery().get('bookmarked');
  if (category) {
    return {
      type: GET_GAMES_BY_CATEGORY,
      arg: { category },
      dataKey: 'gamesByCategory',
      title: `Upcoming ${capitalize(category)} Games`,
    };
  }
  if (bookmarked) {
    return {
      type: GET_GAMES_BY_USER_FAVORITE,
      arg: { userId },
      dataKey: 'gamesByUserFavorite',
      title: 'Your Upcoming Bookmarked Games',
    };
  }
  return { type: GET_ALL_GAMES, dataKey: 'games', title: 'Upcoming Games' };
}

function ListGames() {
  const { currentUser } = useContext(UserContext);
  const {
    type: queryType,
    arg: queryArg,
    dataKey,
    title,
  } = buildQuery(currentUser && currentUser.id, useUrlQuery)
  const {loading, error, data } = useQuery(queryType, { variables: queryArg });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <List
      items={data[dataKey]}
      type="game"
      title={title}
      contentConfig={gameListTableContent}
      isLoading={loading}
      emptyDataMessage="No matching games were found."
    />
  );
}

export default ListGames;
