import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

DrawerComponent.defaultProps = {
  currentUser: null,
};

DrawerComponent.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

export default DrawerComponent;
