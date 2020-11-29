import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import QuestionTable from './QuestionTable';
import QuestionModeButton from './QuestionModeButton';
import {
  ListContainer,
  EmptyDataIndicator,
} from './styledComponents';
import { questionSetModes } from '../../content';

function QuestionList({ game }) {
  const [currentMode, setCurrentMode] = useState(questionSetModes.VIEW);

  useEffect(() => {
    if (
      !game?.questions?.length
      && currentMode === questionSetModes.VIEW
    ) {
      setCurrentMode(questionSetModes.ADD);
    }
  }, [currentMode, game, setCurrentMode]);

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
      <QuestionTable currentMode={currentMode} />
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
  game: null,
};

QuestionList.propTypes = {
  game: PropTypes.objectOf(PropTypes.any),
};

export default QuestionList;
