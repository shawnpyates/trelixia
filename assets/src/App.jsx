import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import './App.css';

import { GET_CURRENT_USER } from './api/queries';
import { UserProvider } from './context/userContext';

import DrawerComponent from './components/Drawer/Drawer';
import NavBar from './components/NavBar/NavBar';

import ListGames from './containers/ListGames';
import ShowGame from './containers/ShowGame';
import CreateGame from './containers/CreateGame';
import CreateUsername from './containers/CreateUsername';
import Auth from './containers/Auth';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const AppContainer = styled.div`
  color: #FFF;
  height: 100vh;
  width: 100vw;
`;


function App() {
  const { root } = useStyles();
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  return (
    <div>
      <AppContainer>
        <div className={root}>
          <Router>
            <UserProvider currentUser={data && data.user} isUserLoading={loading}>
              <NavBar />
              <DrawerComponent />
              <Switch>
                <Route path="/" exact>
                  <div>Hello</div>
                </Route>
                <Route path="/auth">
                  <Auth />
                </Route>
                <Route path="/games" exact>
                  <ListGames />
                </Route>
                <Route path="/games/:id">
                  <ShowGame />
                </Route>
                <Route path="/createGame">
                  <CreateGame />
                </Route>
                <Route path="/createUsername">
                  <CreateUsername />
                </Route>
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </UserProvider>
          </Router>
        </div>
      </AppContainer>
    </div>
  );
}

export default App;
