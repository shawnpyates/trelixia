import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';

import TooltipTitle from './TooltipTitle';
import QuestionRows from './QuestionRows';
import OptionsPicker from '../Form/OptionsPicker';
import {
  ListTable,
  ListButton,
  SideContent,
  StyledTextarea,
  HeadTableCell,
  ContentTableCell,
} from './styledComponents';

import {
  questionSetModes,
  questionTypes,
  questionOptionsForm as questionOptionsFormContent,
} from '../../content';

function QuestionTable({
  isLoading,
  currentMode,
  temporaryRows,
  game,
  handleRowUpdate,
  addNewRow,
  handleQuestionSubmit,
  deleteQuestion,
}) {
  const [popoverEl, setPopoverEl] = useState(null);

  const handleOptionsOpen = ({ currentTarget: { id } }) => {
    setPopoverEl(id);
  };

  const handleOptionsClose = () => {
    setPopoverEl(null);
  };

  console.log('x: ', JSON.stringify({
    isLoading,
    currentMode,
    temporaryRows,
    game,
    handleRowUpdate,
    addNewRow,
    handleQuestionSubmit,
    deleteQuestion,
    popoverEl,
  }));

  return (
    <ListTable isloading={String(isLoading || '')}>
      <TableHead>
        <tr>
          <HeadTableCell>Question</HeadTableCell>
          <HeadTableCell>Answer</HeadTableCell>
          <HeadTableCell>Topic (Optional)</HeadTableCell>
        </tr>
      </TableHead>
      <TableBody>
        {([questionSetModes.ADD, questionSetModes.EDIT].includes(currentMode) && temporaryRows)
      && temporaryRows.map(({
        questionText,
        answer,
        topic,
        compareThreshold,
        timeAllotment,
        type,
        pointValue,
        shortid: key,
        id,
      }, i) => {
        const refId = id || key;
        const isActiveRow = refId === popoverEl;
        const isLast = i === temporaryRows.length - 1;
        const {
          buttonText,
          shouldDisplayNewRowButton,
          shouldRemoveTempRowOnSubmit,
        } = (
          currentMode === questionSetModes.ADD
            ? {
              buttonText: 'Add',
              shouldRemoveTempRowOnSubmit: true,
              shouldDisplayNewRowButton: isLast,
            } : {
              buttonText: 'Edit',
            }
        );
        const optionsFormInitialValues = (
          game.questions.find((question) => question.id === id)
          || { ...game, pointValue: 1 }
        );
        return (
          <Fragment key={refId}>
            <TableRow>
              <ContentTableCell columnlength={3} islast={String(isLast || '')}>
                <StyledTextarea
                  name="questionText"
                  value={questionText || ''}
                  onChange={({ target: { name, value } }) => {
                    handleRowUpdate({ [name]: value }, i);
                  }}
                  rowsMin={3}
                />
              </ContentTableCell>
              <ContentTableCell columnlength={3} islast={String(isLast || '')}>
                <StyledTextarea
                  name="answer"
                  value={answer || ''}
                  onChange={({ target: { name, value } }) => {
                    handleRowUpdate({ [name]: value }, i);
                  }}
                  rowsMin={3}
                />
              </ContentTableCell>
              <ContentTableCell columnlength={3} islast={String(isLast || '')}>
                <StyledTextarea
                  name="topic"
                  value={topic || ''}
                  onChange={({ target: { name, value } }) => {
                    handleRowUpdate({ [name]: value }, i);
                  }}
                  rowsMin={3}
                />
              </ContentTableCell>
              <SideContent>
                <Tooltip
                  title={(
                    <TooltipTitle
                      compareThreshold={compareThreshold}
                      timeAllotment={timeAllotment}
                      type={type}
                      pointValue={pointValue}
                      game={game}
                      questionTypes={questionTypes}
                    />
                  )}
                >
                  <ListButton
                    aria-describedby={popoverEl && 'options-popover'}
                    value={refId}
                    id={refId}
                    onClick={handleOptionsOpen}
                  >
                    Other Options
                  </ListButton>
                </Tooltip>
                <Popover
                  id={refId}
                  open={Boolean(popoverEl) && isActiveRow}
                  anchorEl={popoverEl}
                  onClose={handleOptionsClose}
                  value={refId}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <OptionsPicker
                    fields={questionOptionsFormContent.fields}
                    initialValues={optionsFormInitialValues}
                    currentValues={temporaryRows[i]}
                    handleChange={handleRowUpdate}
                    index={i}
                    row={temporaryRows[i]}
                  />
                </Popover>
              </SideContent>
              <SideContent>
                <ListButton
                  createnewitem="true"
                  disabled={!questionText || !answer}
                  onClick={() => {
                    handleQuestionSubmit({
                      index: i,
                      shouldRemoveTempRow: shouldRemoveTempRowOnSubmit,
                      variables: {
                        id,
                        questionText,
                        answer,
                        timeAllotment,
                        compareThreshold,
                        type,
                        topic,
                        gameId: game.id,
                        pointValue: Number(pointValue),
                      },
                    });
                  }}
                >
                  {buttonText}
                </ListButton>
              </SideContent>
            </TableRow>
            {shouldDisplayNewRowButton
            && (
              <TableRow key="addnew">
                <ContentTableCell columnlength={3} fornewrowbutton="true">
                  <ListButton addnewrow="true" onClick={addNewRow}>+ New Row</ListButton>
                </ContentTableCell>
                <ContentTableCell columnlength={3} />
                <ContentTableCell columnlength={3} />
              </TableRow>
            )}
          </Fragment>
        );
      })}
        {game.questions
        && (
          <QuestionRows
            questions={game.questions}
            deleteQuestion={deleteQuestion}
            currentMode={currentMode}
          />
        )}
      </TableBody>
    </ListTable>
  );
}

QuestionTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  currentMode: PropTypes.string.isRequired,
  temporaryRows: PropTypes.arrayOf(PropTypes.any).isRequired,
  game: PropTypes.objectOf(PropTypes.any).isRequired,
  handleRowUpdate: PropTypes.func.isRequired,
  addNewRow: PropTypes.func.isRequired,
  handleQuestionSubmit: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default QuestionTable;
