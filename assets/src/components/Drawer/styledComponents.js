import {
  Drawer, List, ListItem, ListItemText,
} from '@material-ui/core';
import styled from 'styled-components';

export const StyledDrawer = styled(Drawer)`
  @media only screen and (max-width: 767px) {
    visibility: collapse;
  }

  & div {
    background-color: #E0E0E0;
    min-width: 150px;
  }
`;

export const MenuTitle = styled.h4`
  text-transform: uppercase;
  text-decoration: underline;
  font-weight: 700
`;

export const StyledList = styled(List)`
  padding-top: 0;
`;

export const StyledListItem = styled(ListItem)`
  text-align: center;
  &:hover {
    background-color: #E0E0E0;
  }
`;

export const StyledListItemText = styled(ListItemText)`
  padding: 10px;
  &:hover {
    background-color: #D0D0D0;
  }
`;
