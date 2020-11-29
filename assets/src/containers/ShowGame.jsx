import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {
  GET_GAME,
  GET_FAVORITE,
  CREATE_FAVORITE,
  DELETE_FAVORITE,
} from '../api';
import { formatDate } from '../utils';
import { UserContext } from '../context/userContext';
import QuestionList from '../components/QuestionList/QuestionList';
import { questionSetModes, questionTypes, toastMessages } from '../content';
import {
  GameContainer,
  Title,
  Detail,
  Bookmark,
  BookmarkText,
} from './styledComponents';

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
    };
  };

  const {
    gameData,
    favoriteData,
    loading,
    error,
  } = useMultipleQueries();

  const handleMutationComplete = (data) => {
    toast(toastMessages[Object.keys(data)[0]], { autoClose: 2000, hideProgressBar: true });
  };

  const favoriteMutationOptions = {
    refetchQueries: ['Favorite'],
    onCompleted: handleMutationComplete,
  };
  const [createFavorite] = useMutation(CREATE_FAVORITE, favoriteMutationOptions);
  const [deleteFavorite] = useMutation(DELETE_FAVORITE, favoriteMutationOptions);

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
  );

  const handleBookmarkClick = () => {
    mutationFn({ variables: mutationArgs });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  const isCurrentUserAlsoOwner = gameData?.ownerId === currentUser.id;

  const gameDetails = [
    `Host: ${gameData?.user.username}`,
    `Scheduled for: ${formatDate(gameData?.scheduledFor)}`,
    `Category: ${gameData?.category}`,
    `Number of Questions (subject to change): ${gameData?.questions.length}`,
  ];

  return (
    <GameContainer>
      <Title>{gameData?.name}</Title>
      {!isCurrentUserAlsoOwner
      && (
        <Bookmark onClick={handleBookmarkClick}>
          <BookmarkText>{bookmarkText}</BookmarkText>
          <i className="far fa-bookmark" />
        </Bookmark>
      )}
      <div>
        {gameDetails.map((detail) => <Detail key={detail}>{detail}</Detail>)}
      </div>
      {isCurrentUserAlsoOwner
      && (
        <>
          <QuestionList
            questionSetModes={questionSetModes}
            game={gameData}
            isLoading={loading}
            questionTypes={questionTypes}
          />
          <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </>
      )}
    </GameContainer>
  );
}

export default ShowGame;
