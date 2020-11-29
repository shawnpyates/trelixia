import React, {
  Fragment, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { TableBody, TableHead } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import TableRow from './TableRow';
import EditableRow from './EditableRow';
import {
  ListTable,
  HeadTableCell,
} from './styledComponents';
import { questionSetModes, questionTableHeaders as headers } from '../../content';
import { GET_GAME } from '../../api';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const getInitialNewRow = ({
  defaultCompareThreshold,
  defaultQuestionType,
  defaultTimeAllotment,
}) => ({
  questionText: null,
  answer: null,
  timeAllotment: defaultTimeAllotment,
  compareThreshold: defaultCompareThreshold,
  type: defaultQuestionType,
  pointValue: 1,
  shortid: shortid.generate(),
});

function QuestionTable({ currentMode }) {
  const [editableRows, setEditableRows] = useState(null);
  const previousMode = usePrevious(currentMode);
  const { id } = useParams();

  const { data, loading } = useQuery(GET_GAME, { variables: { id } });

  useEffect(() => {
    if (currentMode === previousMode) {
      return;
    }
    if (currentMode === questionSetModes.ADD) {
      setEditableRows([getInitialNewRow(data?.game)]);
      return;
    }
    if (currentMode === questionSetModes.EDIT) {
      setEditableRows(data?.game.questions);
      return;
    }
    if ([questionSetModes.ADD, questionSetModes.EDIT].includes(previousMode)) {
      setEditableRows(null);
    }
  }, [currentMode, data, previousMode]);

  const addNewRow = () => {
    setEditableRows([...editableRows, getInitialNewRow(data?.game)]);
  };

  const removeEditableRowCallback = (index) => {
    setEditableRows(
      editableRows.length > 1
        ? [...editableRows.slice(0, index), ...editableRows.slice(index + 1)]
        : [getInitialNewRow(data?.game)],
    );
  };

  return (
    <ListTable isloading={String(loading || '')}>
      <TableHead>
        <tr>
          {headers.map((header) => <HeadTableCell key={header}>{header}</HeadTableCell>)}
        </tr>
      </TableHead>
      <TableBody>
        {([questionSetModes.ADD, questionSetModes.EDIT].includes(currentMode) && editableRows)
        && editableRows.map((row, index) => {
          const refId = row.id || row.shortid;
          const isLast = index === editableRows.length - 1;
          return (
            <Fragment key={refId}>
              <EditableRow
                currentMode={currentMode}
                removeEditableRowCallback={removeEditableRowCallback}
                row={row}
                isLast={isLast}
                index={index}
                addNewRow={addNewRow}
              />
            </Fragment>
          );
        })}
        {data?.game.questions
        && (
          <TableRow questions={data?.game.questions} currentMode={currentMode} />
        )}
      </TableBody>
    </ListTable>
  );
}

QuestionTable.propTypes = {
  currentMode: PropTypes.string.isRequired,
};

export default QuestionTable;
