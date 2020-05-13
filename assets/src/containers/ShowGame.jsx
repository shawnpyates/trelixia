import React, { useContext } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import { GET_GAME, GET_FAVORITE } from '../api/queries';
import { CREATE_FAVORITE, DELETE_FAVORITE } from '../api/mutations';
import { formatDate } from '../utils';
import { UserContext } from '../context/userContext';

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
  display: inline-block;
`;

const Detail = styled.p`
  font-size: 18px;
`;

const Bookmark = styled.div`
  display: inline;
  font-size: 18px;
  position: absolute;
  top: 25px;
  right: 100px;
  text-transform: uppercase;
  cursor: pointer;
`;

const BookmarkText = styled.p`
  margin-right: 10px;
  display: inline;
`;

function ShowGame() {
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();

  const useMultipleQueries = () => {
    const gameResult = useQuery(GET_GAME, { variables: { id } });
    const favoriteResult = (
      useQuery(GET_FAVORITE, { variables: { userId: currentUser.id, gameId: id } })
    );
    return {
      gameData: gameResult.data?.game,
      favoriteData: favoriteResult.data?.favorite,
      loading: gameResult.loading || favoriteResult.loading,
      error: gameResult.error || favoriteResult.error,
    }
  }

  const { gameData, favoriteData, loading, error } = useMultipleQueries();

  const refetchQueries = { refetchQueries: ['Favorite'] };
  const [createFavorite] = useMutation(CREATE_FAVORITE, refetchQueries);
  const [deleteFavorite] = useMutation(DELETE_FAVORITE, refetchQueries);

  const { mutationFn, mutationArgs, bookmarkText } = (
    favoriteData
      ? { 
        mutationFn: deleteFavorite,
        mutationArgs: { id: favoriteData.id },
        bookmarkText: 'Remove Bookmark',
      } : {
        mutationFn: createFavorite,
        mutationArgs: { userId: currentUser.id, gameId: id },
        bookmarkText: 'Bookmark',
      }
  )

  const handleBookmarkClick = () => {
    mutationFn({ variables: mutationArgs });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    category,
    name,
    questions,
    scheduledFor,
    user: owner,
  } = gameData || {};
  return (
    <GameContainer>
      <Title>{name}</Title>
      <Bookmark onClick={handleBookmarkClick}>
        <BookmarkText>{bookmarkText}</BookmarkText><i className="far fa-bookmark"></i>
      </Bookmark>
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