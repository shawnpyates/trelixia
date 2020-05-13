import React from 'react';
// import { ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import {
  MenuTitle,
  StyledDrawer,
  StyledList,
  StyledListItem,
  StyledListItemText,
} from './styledComponents';

import { menuItems } from '../../content';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
}));

function DrawerComponent() {
  const { drawer, toolbar } = useStyles();
  return (
    <StyledDrawer className={drawer} variant="permanent" anchor="left">
      <div className={toolbar} />
      <StyledList>
        <StyledListItem button>
          <MenuTitle>Trelixia</MenuTitle>
        </StyledListItem>
        {menuItems.map(({ text, link, requiresCurrentUser }) => (
          !requiresCurrentUser
          && (
            <Link to={link} key={text}>
              <StyledListItem button>
                <StyledListItemText primary={text} />
              </StyledListItem>
            </Link>
          )
        ))}
      </StyledList>
    </StyledDrawer>
  );
}


export default DrawerComponent;