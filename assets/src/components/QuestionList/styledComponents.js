import {
  Button as MaterialUiButton,
  Table,
  TextareaAutosize,
  TableCell as MaterialUiTableCell,
  TableContainer as MaterialUiTableContainer,
} from '@material-ui/core';
import styled from 'styled-components';
import { DeleteForever } from '@material-ui/icons';

import { TABLE_POSITION_MIXIN } from '../../styles/mixins';

export const ListContainer = styled(MaterialUiTableContainer)`
`;

export const ListTable = styled(Table)`
  width: 95%;
  ${(props) => (props.isloading ? 'filter: blur(5px);' : '')}
`;

export const ListButton = styled(MaterialUiButton)`
  background-color: #FFF;
  ${(props) => (
    props.createnewitem
      ? ''
      : 'margin-right: 10px;'
  )}
  ${(props) => (
    props.addnewrow
      ? 'width: 80px; font-size: 10px;'
      : 'width: max-content;'
  )}

  &:hover {
    background-color: gray;
  }
  display: ${((props) => (props.ishidden ? 'none' : 'initial'))}
`;

export const SideContent = styled.td`
  margin-left: 20px;
`;

export const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 16px;
`;

export const StyledDeleteIcon = styled(DeleteForever)`
  color: red;
  cursor: pointer;
`;

export const ContentTableCell = styled(MaterialUiTableCell)`
  color: #FFF;
  width: calc(100% / ${(props) => props.columnlength});
  ${(props) => (props.islast && 'border-bottom: none;') || ''}
  ${(props) => (props.fornewrowbutton && 'padding-bottom: 35px;') || ''}
  padding: 0 5px auto;
  & pre > code {
    white-space: pre-wrap !important;
  }
`;


export const TableContainer = styled(MaterialUiTableContainer)`
  overflow: visible;
  min-width: 650px;
  ${TABLE_POSITION_MIXIN};
`;

export const Button = styled(MaterialUiButton)`
  background-color: blue;
  color: #FFF;
  &:disabled{
    background-color: gray;
  }
`;

export const HeadTableCell = styled(MaterialUiTableCell)`
  font-weight: 700;
  text-transform: uppercase;
  color: #FFF;
`;

export const EmptyDataIndicator = styled.div`
  margin: 35px auto;
  text-align: center;
`;
