import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { EDIT_USER } from '../api/mutations';
import { createUsername as createUsernameFormContent } from '../content.json';
import Form from '../components/Form/Form';


const validate = (values) => (
  values.username
    ? {}
    : { username: 'Username required.' }
);


function CreateUsername() {
  // TODO - fetch real user after OAuth success
  const [editUser, { data }] = useMutation(EDIT_USER);
  const history = useHistory();

  const handleSubmit = ({ username }, { setSubmitting }) => {
    setSubmitting(false);
    editUser({ variables: { username, id: 11 } });
  };

  if (data) {
    history.push('/');
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      fields={createUsernameFormContent.fields}
      title={createUsernameFormContent.title}
      validate={validate}
      initialValues={createUsernameFormContent.initialValues}
    />
  );
}

export default CreateUsername;
