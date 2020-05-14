import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, useLocation } from 'react-router-dom';

import { CREATE_USER } from '../api/mutations';
import { createUserForm } from '../content';
import Form from '../components/Form/Form';

const validate = (values) => {};

const useUrlQuery = () => new URLSearchParams(useLocation().search);

function Auth() {
  const history = useHistory();
  const redirectPath = useUrlQuery().get('redirectFrom');

  const [createUser, { data }] = useMutation(CREATE_USER, {
    refetchQueries: ['User'],
  });

  if (data?.createUser) {
    history.push(`/${redirectPath}`);
  }

  const handleSubmit = (
    {
      username,
      email,
      firstPasswordEntry: password,
    },
    { setSubmitting },
  ) => {
    setSubmitting(false);
    createUser({ variables: { username, email, password, isRegistered: true } });
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      fields={createUserForm.fields}
      title={createUserForm.title}
      validate={validate}
      initialValues={createUserForm.initialValues}
    />
  );
}
 
export default Auth;