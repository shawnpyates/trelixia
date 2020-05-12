/* eslint react/prop-types: 0 */
import React, { createContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

export const UserContext = createContext();

const USERNAME_PATH = '/createUsername';

export const UserProvider = ({ children, currentUser, isUserLoading }) => {
  const { pathname } = useLocation();
  return (
    <UserContext.Provider value={{ currentUser, isUserLoading }}>
      {
        (currentUser && !currentUser.username && pathname !== USERNAME_PATH)
          ? <Redirect to='/createUsername' />
          : children
      }
    </UserContext.Provider>
  );
};