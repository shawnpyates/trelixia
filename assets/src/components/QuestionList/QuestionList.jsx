import React, { Fragment, useState } from 'react';
import {
  Popover,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import OptionsPicker from '../Form/OptionsPicker';

import { questionOptionsForm as questionOptionsFormContent } from '../../content';

import {
  ListContainer,
  ListTable,
  ListButton,
  SideContent,
  StyledTextarea,
  StyledDeleteIcon,
  HeadTableCell,
  ContentTableCell,
  EmptyDataIndicator,
} from './styledComponents';

function QuestionList({
  questionSetModes,
  currentMode,
  setCurrentMode,
  temporaryRows,
  handleRowUpdate,
  addNewRow,
  handleQuestionSubmit,
  deleteQuestion,
  game,
  isLoading,
  questionTypes,
}) {
  const [popoverEl, setPopoverEl] = useState(null);

  const handleOptionsOpen = ({ currentTarget: { id } }) => {
    setPopoverEl(id);
  };

  const handleOptionsClose = () => {
    setPopoverEl(null);
  };

  const getTooltipTitle = ({
    compareThreshold,
    timeAllotment,
    type,
    pointValue,
  }) => (
    <>
      {game.isAutomated
      && (
        <p>Required Match Score: {compareThreshold || game.defaultCompareThreshold}</p>
      )}
      <p>Time Allowed (s): {timeAllotment || game.defaultTimeAllotment}</p>
      <p>Type: {questionTypes[type]?.label || questionTypes[game.defaultQuestionType]?.label}</p>
      <p>Point Value: {pointValue || 1}</p>
    </>
  );

  const renderQuestions = (questions) => (
    questions.map(({
      id,
      questionText,
      answer,
      topic,
    }) => (
      <TableRow key={id}>
        {[questionSetModes.VIEW, questionSetModes.ADD].includes(currentMode)
        && (
          <>
            <ContentTableCell columnlength={3}>
              {questionText}
            </ContentTableCell>
            <ContentTableCell columnlength={3}>
              {answer}
            </ContentTableCell>
            <ContentTableCell columnlength={3}>
              {topic || 'n/a'}
            </ContentTableCell>
            <SideContent>
              <StyledDeleteIcon
                onClick={() => {
                  deleteQuestion({ variables: { id } });
                }}
              />
            </SideContent>
          </>
        )}
      </TableRow>
    ))
  );

  const getQuestionList = () => (
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
          const optionsFormInitialValues = game.questions.find((question) => question.id === id) || { ...game, pointValue: 1 };
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
                    title={getTooltipTitle({ compareThreshold, timeAllotment, type, pointValue })}
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
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
        {game.questions && renderQuestions(game.questions)}
      </TableBody>
    </ListTable>
  );

  const getButton = (mode, text) => (
    mode !== currentMode
    && (
      <ListButton
        onClick={() => {
          setCurrentMode(mode)
        }}
      >
        {text}
      </ListButton>
    )
  );

  return (
    <ListContainer>
      <h3>
        Questions
      </h3>
      <div>
        {((game.questions && game.questions.length)
        && (
          <>
            {getButton(questionSetModes.ADD, 'Add More Questions')}
            {getButton(questionSetModes.VIEW, 'View Questions')}
            {getButton(questionSetModes.EDIT, 'Edit Questions')}
          </>
        )) || ''}
      </div>
      {getQuestionList()}
      {(game.questions && !game.questions.length
      && (
        <EmptyDataIndicator>
          {`${game.name} currently contains no questions. Create some questions above to get started!`}
        </EmptyDataIndicator>
      )) || ''}
    </ListContainer>
  );
}

QuestionList.defaultProps = {
  temporaryRows: null,
  game: null,
};

QuestionList.propTypes = {
  questionSetModes: PropTypes.objectOf(PropTypes.string).isRequired,
  currentMode: PropTypes.string.isRequired,
  temporaryRows: PropTypes.arrayOf(PropTypes.object),
  handleTextareaChange: PropTypes.func.isRequired,
  addNewRow: PropTypes.func.isRequired,
  game: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool.isRequired,
};

export default QuestionList;
