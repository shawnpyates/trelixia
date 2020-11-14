/* eslint react/prop-types: 0 */
import React, { createContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

export const UserContext = createContext();

const USERNAME_PATH = '/createUsername';

const pathsRequiringAuth = ['/createGame', USERNAME_PATH];

const renderChildren = ({
  currentUser, children, pathname, isUserLoading,
}) => {
  if (isUserLoading) {
    return <div>Loading...</div>;
  }
  if (!currentUser?.isRegistered && pathsRequiringAuth.includes(pathname)) {
    return <Redirect to={`/auth?redirectFrom=${pathname.slice(1)}`} />;
  }
  if (currentUser?.isRegistered && !currentUser?.username && pathname !== USERNAME_PATH) {
    return <Redirect to={USERNAME_PATH} />;
  }
  return children;
};

export const UserProvider = ({ children, currentUser, isUserLoading }) => {
  const { pathname } = useLocation();
  return (
    <UserContext.Provider value={{ currentUser, isUserLoading }}>
      {renderChildren({
        currentUser, children, pathname, isUserLoading,
      })}
    </UserContext.Provider>
  );
};
