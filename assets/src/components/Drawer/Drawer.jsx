import React from 'react';
import { Link } from 'react-router-dom';

import {
  MenuTitle,
  StyledDrawer,
  StyledList,
  StyledListItem,
  StyledListItemText,
} from './styledComponents';

import { menuItems } from '../../content';

function DrawerComponent({ currentUser }) {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <StyledList>
        <StyledListItem button>
          <MenuTitle>Trelixia</MenuTitle>
        </StyledListItem>
        {menuItems.map(({ text, link, requiresCurrentUser }) => (
          (!requiresCurrentUser || currentUser?.isRegistered)
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
