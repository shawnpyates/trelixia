import React, {
  useEffect, useRef, useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import {
  Grow,
  Popper,
  ClickAwayListener,
  Paper,
  MenuList,
  MenuItem,
  Link,
  Toolbar,
} from '@material-ui/core';

import { menuItems } from '../../content';

import {
  ButtonContainer,
  LightningIcon,
  ResponsiveP,
  StyledAppBar,
  StyledButton,
  StyledGitHubIcon,
  StyledFaIcon,
  StyledMenuIcon,
  StyledTitle,
} from './styledComponents';

const AUTH_URL = "http://localhost:4003/auth";
const currentUser = null;
const isUserLoading = false;

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setIsMenuOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setIsMenuOpen(false);
    }
  };

  const wasPreviouslyOpen = useRef(isMenuOpen);

  useEffect(() => {
    if (wasPreviouslyOpen.current === true && isMenuOpen === false) {
      anchorRef.current.focus();
    }

    wasPreviouslyOpen.current = isMenuOpen;
  }, [isMenuOpen]);

  const buttons = (
    currentUser
      ? [{ endpoint: '/signout', content: 'Sign Out' }]
      : [{
        endpoint: '/google',
        content:
        <>
          <StyledFaIcon className="fab fa-google" />
          <ResponsiveP>Sign in with Google</ResponsiveP>
        </>,
      },
      {
        endpoint: '/github',
        content:
        <>
          <StyledGitHubIcon />
          <ResponsiveP>Sign in with Github</ResponsiveP>
        </>,
      }]
  );
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <LightningIcon />
        <StyledTitle
          variant="h5"
          color="inherit"
          onClick={() => {
            history.push('/');
          }}
        >
          Trelixia
        </StyledTitle>
        <StyledMenuIcon
          ref={anchorRef}
          aria-controls={(isMenuOpen && 'menu-list-grow') || null}
          aria-haspopup="true"
          onClick={toggleMenu}
        />
        <Popper
          open={isMenuOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={isMenuOpen} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {menuItems.map(({ text, link, requiresCurrentUser }) => (
                      (currentUser || !requiresCurrentUser)
                      && (
                        <Link href={link} key={text}>
                          <MenuItem onClick={handleClose}>{text}</MenuItem>
                        </Link>
                      )
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {!isUserLoading
        && (
          <ButtonContainer>
            {buttons.map(({ endpoint, content }) => (
              <StyledButton key={endpoint}>
                <Link href={`${AUTH_URL}${endpoint}`}>
                  {content}
                </Link>
              </StyledButton>
            ))}
          </ButtonContainer>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}
export default NavBar;