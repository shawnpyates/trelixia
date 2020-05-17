import React, { Fragment, useState } from 'react';
import {
  Popover,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';

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
  isSetFromCurrentUser,
  temporaryRows,
  handleTextareaChange,
  addNewRow,
  handleQuestionSubmit,
  deleteQuestion,
  game,
  isLoading,
  questionTypes,
}) {
  const [popoverEl, setPopoverEl] = useState(null);

  const handleOptionsClick = (event) => {
    setPopoverEl(event.currentTarget);
  }

  const handleOptionsClose = () => {
    setPopoverEl(null);
  };

  const getTooltipTitle = ({
    compareThreshold,
    timeAllotment,
    type,
    pointValue,
  }) => (
    <Fragment>
      {game.isAutomated
      && (
        <p>Required Match Score: {compareThreshold || game.defaultCompareThreshold}</p>
      )}
      <p>Time Allowed (s): {timeAllotment || game.defaultTimeAllotment}</p>
      <p>Type: {questionTypes[type]?.label || questionTypes[game.defaultQuestionType]?.label}</p>
      <p>Point Value: {pointValue || 1}</p>
    </Fragment>
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
          const correspondingQuestion = id && game.questions.find((question) => question.id === id);
          const isUnchanged = (
            correspondingQuestion
            && (
              correspondingQuestion.questionText === questionText
              && correspondingQuestion.answer === answer
            )
          );
          return (
            <Fragment key={id || key}>
              <TableRow>
                <ContentTableCell columnlength={3} islast={String(isLast || '')}>
                  <StyledTextarea
                    name="questionText"
                    value={questionText || ''}
                    onChange={(ev) => {
                      handleTextareaChange(ev, i)
                    }}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <ContentTableCell columnlength={3} islast={String(isLast || '')}>
                  <StyledTextarea
                    name="answer"
                    value={answer || ''}
                    onChange={(ev) => {
                      handleTextareaChange(ev, i)
                    }}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <ContentTableCell columnlength={3} islast={String(isLast || '')}>
                  <StyledTextarea
                    name="topic"
                    value={topic || ''}
                    onChange={(ev) => {
                      handleTextareaChange(ev, i)
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
                      onClick={handleOptionsClick}
                    >
                      Other Options
                    </ListButton>
                  </Tooltip>
                  <Popover
                    id={'options-popover'}
                    open={Boolean(popoverEl)}
                    anchorEl={popoverEl}
                    onClose={handleOptionsClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    <div style={{ height: '300px', width: '300px' }}>Options form upcoming...</div>
                  </Popover>
                </SideContent>
                <SideContent>
                  <ListButton
                    createnewitem="true"
                    disabled={!questionText || !answer || isUnchanged}
                    onClick={() => {
                      handleQuestionSubmit({
                        index: i,
                        shouldRemoveTempRow: shouldRemoveTempRowOnSubmit,
                        variables: {
                          id,
                          questionText,
                          answer,
                          timeAllotment: 60,
                          gameId: game.id,
                          pointValue: 1,
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
            {isSetFromCurrentUser
            && (
              <>
                {getButton(questionSetModes.ADD, 'Add More Questions')}
                {getButton(questionSetModes.VIEW, 'View Questions')}
                {getButton(questionSetModes.EDIT, 'Edit Questions')}
              </>
            )}
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
  isSetFromCurrentUser: false,
  temporaryRows: null,
  game: null,
};

QuestionList.propTypes = {
  questionSetModes: PropTypes.objectOf(PropTypes.string).isRequired,
  currentMode: PropTypes.string.isRequired,
  isSetFromCurrentUser: PropTypes.bool,
  temporaryRows: PropTypes.arrayOf(PropTypes.object),
  handleTextareaChange: PropTypes.func.isRequired,
  addNewRow: PropTypes.func.isRequired,
  game: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool.isRequired,
};

export default QuestionList;
