import React, { Fragment } from 'react';
import {
  TableBody,
  TableHead,
  TableRow,
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
  game,
  isLoading,
}) {
  const renderQuestions = (questions) => (
    questions.map(({ id, questionText, answer }) => (
      <TableRow key={id}>
        {[questionSetModes.VIEW, questionSetModes.ADD].includes(currentMode)
        && (
          <>
            <ContentTableCell columnlength={2}>
              {questionText}
            </ContentTableCell>
            <ContentTableCell columnlength={2}>
              {answer}
            </ContentTableCell>
            <SideContent>
              {isSetFromCurrentUser
              && (
                <StyledDeleteIcon
                  onClick={() => {
                    // setQuestionUnderOperation({ type: DELETE_CARD, id, submit: true });
                  }}
                />
              )}
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
        </tr>
      </TableHead>
      <TableBody>
        {([questionSetModes.ADD, questionSetModes.EDIT].includes(currentMode) && temporaryRows)
        && temporaryRows.map(({
          questionText, answer, shortid: key, id,
        }, i) => {
          const isLast = i === temporaryRows.length - 1;
          const { type, buttonText, shouldDisplayNewRowButton } = (
            currentMode === questionSetModes.ADD
              ? {
                // type: CREATE_NEW_CARD,
                buttonText: 'Add',
                shouldDisplayNewRowButton: isLast,
              } : {
                // type: EDIT_CARD,
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
                <ContentTableCell columnlength={2} islast={String(isLast || '')}>
                  <StyledTextarea
                    name="question"
                    value={questionText || ''}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <ContentTableCell columnlength={2} islast={String(isLast || '')}>
                  <StyledTextarea
                    name="answer"
                    value={answer || ''}
                    onChange={(ev) => handleTextareaChange(ev, i)}
                    rowsMin={3}
                  />
                </ContentTableCell>
                <SideContent>
                  <ListButton
                    createnewitem="true"
                    disabled={!questionText || !answer || isUnchanged}
                    onClick={() => {
                      // setQuestionUnderOperation({
                      //   type, question, answer, index: i, id, submit: true,
                      // });
                    }}
                  >
                    {buttonText}
                  </ListButton>
                </SideContent>
              </TableRow>
              {shouldDisplayNewRowButton
              && (
                <TableRow key="addnew">
                  <ContentTableCell columnlength={2} fornewrowbutton="true">
                    <ListButton addnewrow="true" onClick={addNewRow}>+ New Row</ListButton>
                  </ContentTableCell>
                  <ContentTableCell columnlength={2} />
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