import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Composition } from 'atomic-layout';
import styled from 'styled-components';

import { CREATE_GAME } from '../api/mutations';
import { createGameForm } from '../content';
import { createGameSchema } from '../validationSchemas';
import { UserContext } from '../context/userContext';

import Form from '../components/Form/Form';

const StyledComposition = styled(Composition)`
  position: absolute;
  top: 15%;
`;

const areasMd = `
  phantom formBlock
`;

const areas = `
  formBlock
`;

function CreateGame() {
  const { currentUser } = useContext(UserContext);
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
        ownerId: currentUser.id,
        defaultTimeAllotment,
        defaultQuestionType,
      },
    });
  };

  return (
    <StyledComposition areas={areas} areasMd={areasMd} gap={100} gutter={70} padding={50}>
      {({ Phantom, FormBlock }) => (
        <>
          <Phantom width={300} />
          <FormBlock>
            <Form
              handleSubmit={handleSubmit}
              fields={createGameForm.fields}
              title={createGameForm.title}
              validationSchema={createGameSchema}
              initialValues={createGameForm.initialValues}
            />
          </FormBlock>
        </>
      )}
    </StyledComposition>
  );
}

export default CreateGame;
