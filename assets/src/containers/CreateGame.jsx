import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { CREATE_GAME } from '../api/mutations';
import { createGameForm } from '../content';
import { createGameSchema } from '../validationSchemas';

import Form from '../components/Form/Form';

function CreateGame() {
  const [createGame, { data }] = useMutation(CREATE_GAME);
  const history = useHistory();

  if (data) {
    history.push(`/games/${data.createGame.id}`);
  }

  const handleSubmit = (
    {
      name,
      category,
      isAutomated,
      defaultCompareThreshold,
      maxPlayers,
      scheduledFor,
      defaultTimeAllotment,
      defaultQuestionType,
      ownerId,
    },
    { setSubmitting },
  ) => {
    setSubmitting(false);
    createGame({
      variables: {
        name,
        category,
        isAutomated,
        defaultCompareThreshold,
        maxPlayers,
        scheduledFor,
        ownerId,
        defaultTimeAllotment,
        defaultQuestionType,
      },
    });
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      fields={createGameForm.fields}
      title={createGameForm.title}
      validationSchema={createGameSchema}
      initialValues={createGameForm.initialValues}
    />
  );
}

export default CreateGame;
