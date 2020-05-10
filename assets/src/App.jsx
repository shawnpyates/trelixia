import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import './App.css';

import DrawerComponent from './components/Drawer/Drawer';
import NavBar from './components/NavBar/NavBar';

import ListAll from './containers/ListAll';
import ShowGame from './containers/ShowGame';
import CreateGame from './containers/CreateGame';
import CreateUsername from './containers/CreateUsername';

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
  return (
    <div>
      <AppContainer>
        <div className={root}>
          <Router>
            <NavBar />
            <DrawerComponent />
            <Switch>
              <Route path="/" exact>
                <div>Hello</div>
              </Route>
              <Route path="/games" exact>
                <ListAll />
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
          </Router>
        </div>
      </AppContainer>
    </div>
  );
}

export default App;
