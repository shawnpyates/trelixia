import React from 'react';
import PropTypes from 'prop-types';


import QuestionTable from './QuestionTable';
import QuestionModeButton from './QuestionModeButton';

import {
  ListContainer,
  EmptyDataIndicator,
} from './styledComponents';

import { questionSetModes } from '../../content';

function QuestionList({
  currentMode,
  setCurrentMode,
  temporaryRows,
  handleRowUpdate,
  addNewRow,
  handleQuestionSubmit,
  deleteQuestion,
  game,
  isLoading,
}) {
  return (
    <ListContainer>
      <h3>
        Questions
      </h3>
      <div>
        {((game.questions && game.questions.length)
        && (
          <>
            {Object.values(questionSetModes).map((mode) => (
              mode !== currentMode
              && <QuestionModeButton mode={mode} setCurrentMode={setCurrentMode} />
            ))}
          </>
        )) || ''}
      </div>
      <QuestionTable
        isLoading={isLoading}
        currentMode={currentMode}
        temporaryRows={temporaryRows}
        game={game}
        handleRowUpdate={handleRowUpdate}
        addNewRow={addNewRow}
        handleQuestionSubmit={handleQuestionSubmit}
        deleteQuestion={deleteQuestion}
      />
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
  currentMode: PropTypes.string.isRequired,
  temporaryRows: PropTypes.arrayOf(PropTypes.object),
  addNewRow: PropTypes.func.isRequired,
  game: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool.isRequired,
  setCurrentMode: PropTypes.func.isRequired,
  handleRowUpdate: PropTypes.func.isRequired,
  handleQuestionSubmit: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default QuestionList;
