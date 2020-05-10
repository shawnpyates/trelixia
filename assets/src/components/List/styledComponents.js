import {
  Table,
  TableRow,
  TextField,
  Button as MaterialUiButton,
  TableCell as MaterialUiTableCell,
  TableContainer as MaterialUiTableContainer,
} from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CENTER_ELEMENT_MIXIN, TABLE_POSITION_MIXIN } from '../../styles/mixins';

export const StyledTable = styled(Table)`
  ${(props) => (props.isloading ? 'filter: blur(5px);' : '')}
`;


const TableContainer = styled(MaterialUiTableContainer)`
  overflow: visible;
  min-width: 650px;
  ${TABLE_POSITION_MIXIN};
`;

const Button = styled(MaterialUiButton)`
  background-color: #060;
  color: #FFF;
  &:hover {
    background-color: #070;
  }
  &:disabled{ 
    background-color: #F0F0F0;
  }
`;

export const ListContainer = styled(TableContainer)`
  width: 55%;
`;

export const ListRow = styled(TableRow)`
  cursor: pointer;
`;

export const ListButton = styled(Button)`
  ${(props) => (
    props.newitem
      ? 'transform: translateY(25%);'
      : 'display: block;'
  )}
`;

export const NewItemContainer = styled.div`
  margin: 30px auto 5px;
  ${(props) => (props.isCreating ? 'filter: blur(5px);' : '')}
`;

export const StyledTextField = styled(TextField)`
  margin-right: 25px;
  width: 250px;
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  ${(props) => (props.margintop ? 'margin-top: 100px;' : '')}
  
  ${CENTER_ELEMENT_MIXIN}
`;

export const HeadTableCell = styled(MaterialUiTableCell)`
  font-weight: 700;
  text-transform: uppercase;
  color: #FFF;
`;

export const ContentTableCell = styled(MaterialUiTableCell)`
  color: #FFF;
  width: calc(100% / ${(props) => props.columnlength});
`;

export const EmptyDataIndicator = styled.div`
  margin: 35px auto;
  text-align: center;
`;

export const StyledRowLink = styled(Link)`
  display: contents;
`;
