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

const toastOptions = { autoClose: 2000, hideProgressBar: true };

function Auth() {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const redirectPath = useUrlQuery().get('redirectFrom');

  const mutationOptions = { refetchQueries: ['User'] };
  const [createUser] = useMutation(CREATE_USER, mutationOptions);
  const [loginUser] = useMutation(LOGIN_USER, mutationOptions);

  useEffect(() => {
    if (currentUser?.isRegistered) {
      history.push(`/${redirectPath}`);
    }
  }, [currentUser]);

  const handleErrorToast = ({ graphQLErrors: errors }) => {
    if (errors[0]?.message) {
      toast(errors[0]?.message, toastOptions);
    }
  }

  const handleRegisterSubmit = (
    { username, email, firstPasswordEntry: password },
    { setSubmitting },
  ) => {
    setSubmitting(false);
    createUser({ variables: { username, email, password, isRegistered: true } })
      .catch((e) => {
        handleErrorToast(e)
      });
  };

  const handleLoginSubmit = ({ username, password }, { setSubmitting }) => {
    setSubmitting(false);
    loginUser({ variables: { username, password } })
      .catch((e) => {
        handleErrorToast(e)
      });
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
