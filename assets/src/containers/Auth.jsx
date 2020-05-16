import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { CREATE_USER, LOGIN_USER } from '../api/mutations';
import { createUserForm, loginForm } from '../content';
import Form from '../components/Form/Form';
import { UserContext } from '../context/userContext';
import { createUserSchema, loginSchema } from '../validationSchemas';

const useUrlQuery = () => new URLSearchParams(useLocation().search);

function Auth() {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const redirectPath = useUrlQuery().get('redirectFrom');

  const [createUser, { error: createUserError }] = useMutation(
    CREATE_USER,
    { refetchQueries: ['User'] },
  );
  const [loginUser, { error: loginUserError }] = useMutation(
    LOGIN_USER,
    { refetchQueries: ['User'] },
  );

  const displayErrorIfExists = (error) => {
    const errorMsg = error?.graphQLErrors[0]?.message;
    if (errorMsg) {
      toast(errorMsg, { autoClose: 2000, hideProgressBar: true });
    }
  };

  useEffect(() => {
    displayErrorIfExists(createUserError);
  }, [createUserError]);

  useEffect(() => {
    displayErrorIfExists(loginUserError);
  }, [loginUserError])

  useEffect(() => {
    if (currentUser?.isRegistered) {
      history.push(`/${redirectPath}`);
    }
  }, [currentUser]);

  const handleRegisterSubmit = async (
    { username, email, firstPasswordEntry: password },
    { setSubmitting },
  ) => {
    setSubmitting(false);
    try {
      await createUser({ variables: { username, email, password, isRegistered: true } });
    } catch(_e) {
      // handle error in hook
    }
  };

  const handleLoginSubmit = async ({ username, password }, { setSubmitting }) => {
    setSubmitting(false);
    try {
      await loginUser({ variables: { username, password } });
    } catch(_e) {
      // handle error in hook
    }
  };

  return (
    <>
      <div style={{ display: 'block', position: 'absolute', left: '35%' }}>
        <Form
          handleSubmit={handleRegisterSubmit}
          fields={createUserForm.fields}
          title={createUserForm.title}
          validationSchema={createUserSchema}
          initialValues={createUserForm.initialValues}
        />
      </div>
      <div style={{ display: 'block', position: 'absolute', right: '20%' }}>
        <Form
          handleSubmit={handleLoginSubmit}
          fields={loginForm.fields}
          title={loginForm.title}
          validationSchema={loginSchema}
          initialValues={loginForm.initialValues}
        />
      </div>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}
 
export default Auth;