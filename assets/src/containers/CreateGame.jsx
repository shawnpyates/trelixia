import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { CREATE_GAME } from '../api/mutations';
import { createGame as createGameFormContent } from '../content.json';

import Form from '../components/Form/Form';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name Required';
  } else if (!values.category) {
    errors.category = 'Category Required';
  }
  return errors;
};

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
      },
    });
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      fields={createGameFormContent.fields}
      title={createGameFormContent.title}
      validate={validate}
      initialValues={createGameFormContent.initialValues}
    />
  );
}

export default CreateGame;
