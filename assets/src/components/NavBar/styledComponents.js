import styled from 'styled-components';

import {
  AppBar,
  Button,
  Typography,
} from '@material-ui/core';
import { FlashOn, GitHub, Menu } from '@material-ui/icons';

import { BUTTON_ICON_MIXIN } from '../../styles/mixins';

const logoFont = 'Pathway Gothic One';

export const ButtonContainer = styled.div`
  position: absolute;
  right: 2%;
`;

export const StyledAppBar = styled(AppBar)`
  background-color: #5A0000;
  z-index: 5000;
  position: fixed;
`;

export const StyledButton = styled(Button)`
  background-color: #FFF;
  margin-left: 25px;
  &:hover {
    background-color: #CCC;
  }
  & a {
    color: #000;
    &:hover {
      text-decoration: none;
    }
  }
  @media only screen and (max-width: 800px) {
    background-color: #5A0000;
    margin: 0;
    min-width: 10px;
    &:hover {
      background-color: initial;
    }
  }
`;

export const StyledGitHubIcon = styled(GitHub)`
  font-size: 16px;
  ${BUTTON_ICON_MIXIN}
  @media only screen and (max-width: 800px) {
    color: #FFF;
  }
`;

export const StyledFaIcon = styled.i`
  height: 16px;
  ${BUTTON_ICON_MIXIN}
  @media only screen and (max-width: 800px) {
    color: white;
  }
`;

export const StyledMenuIcon = styled(Menu)`
  margin-left: 20px;
  cursor: pointer;
  @media only screen and (min-width: 1040px) {
    visibility: collapse;
  }
`;

export const ResponsiveP = styled.p`
  display: inline;
  text-transform: none;
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

export const StyledTitle = styled(Typography)`
  cursor: pointer;
  font-family ${logoFont};
  text-transform: uppercase;
  font-size: 38px;
`;

export const LightningIcon = styled(FlashOn)`
  font-size: 34px;
`;