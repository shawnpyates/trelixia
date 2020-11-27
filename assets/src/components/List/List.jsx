import React from 'react';
import {
  TableBody,
  TableHead,
} from '@material-ui/core';
// import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
  StyledTable,
  ListContainer,
  ListRow,
  // ListButton,
  // NewItemContainer,
  // StyledTextField,
  HeadTableCell,
  ContentTableCell,
  EmptyDataIndicator,
  LoadingIndicator,
} from './styledComponents';
import { formatDate } from '../../utils';

function List({
  title,
  type,
  items,
  contentConfig,
  isLoading,
  emptyDataMessage,
}) {
  const history = useHistory();

  // const handleChange = ({ target: { value } }) => {
  //   updateInput(value);
  // };

  // const handleKeyUp = ({ keyCode }) => {
  //   if (keyCode === ENTER_KEY && !!currentInput) {
  //     submitInput();
  //   }
  // };

  const getItemTable = () => (
    <>
      <TableHead>
        <tr>
          {contentConfig.map(({ header }) => <HeadTableCell key={header}>{header}</HeadTableCell>)}
        </tr>
      </TableHead>
      <TableBody>
        {items.map((row) => (
          <ListRow
            key={row.id}
            onClick={() => {
              history.push(`/${type}s/${row.id}`);
            }}
          >
            {contentConfig.map(({ key, isTimestamp }) => (
              <ContentTableCell key={key} columnlength={contentConfig.length}>
                {isTimestamp ? formatDate(row[key]) : row[key]}
              </ContentTableCell>
            ))}
          </ListRow>
        ))}
      </TableBody>
    </>
  );
  return (
    <>
      <ListContainer>
        <h3>
          {title}
        </h3>
        {(isLoading) && <LoadingIndicator margintop>Loading...</LoadingIndicator>}
        {items
        && (items.length
          ? (
            <StyledTable isloading={String(isLoading || '')}>
              {getItemTable()}
            </StyledTable>
          ) : (
            <EmptyDataIndicator>{emptyDataMessage}</EmptyDataIndicator>
          )
        )}
      </ListContainer>
    </>
  );
}

List.defaultProps = {
  // nextPaginationId: null,
  // currentInput: null,
  // fetchMore: null,
  // initActionButtonText: null,
  // isCreating: false,
  items: null,
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  contentConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
  // isCreating: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  // fetchMore: PropTypes.func,
  // nextPaginationId: PropTypes.string,
  // currentInput: PropTypes.string,
  // updateInput: PropTypes.func.isRequired,
  // submitInput: PropTypes.func.isRequired,
  // initActionButtonText: PropTypes.string,
  // submitInputButtonText: PropTypes.string.isRequired,
  // inputLabel: PropTypes.string.isRequired,
  emptyDataMessage: PropTypes.string.isRequired,
};
export default List;
