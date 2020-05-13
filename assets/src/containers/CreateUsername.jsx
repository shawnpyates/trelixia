import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { EDIT_USER } from '../api/mutations';
import { createUsernameForm } from '../content';
import Form from '../components/Form/Form';
import { UserContext } from '../context/userContext';


const validate = (values) => (
  values.username
    ? {}
    : { username: 'Username required.' }
);


function CreateUsername() {
  const { currentUser } = useContext(UserContext);
  const [editUser] = useMutation(EDIT_USER, {
    refetchQueries: ['User'],
  });
  const history = useHistory();

  const handleSubmit = ({ username }, { setSubmitting }) => {
    setSubmitting(false);
    editUser({ variables: { username, id: currentUser.id } });
  };

  if (currentUser.username) {
    history.push('/');
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      fields={createUsernameForm.fields}
      title={createUsernameForm.title}
      validate={validate}
      initialValues={createUsernameForm.initialValues}
    />
  );
}

export default CreateUsername;
