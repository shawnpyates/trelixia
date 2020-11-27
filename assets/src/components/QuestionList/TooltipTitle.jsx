import React from 'react';
import PropTypes from 'prop-types';

import { questionTypes } from '../../content';

function TooltipTitle({
  compareThreshold,
  timeAllotment,
  type,
  pointValue,
  game,
}) {
  return (
    <>
      {game.isAutomated
    && (
      <p>
        Required Match Score:
        {compareThreshold || game.defaultCompareThreshold}
      </p>
    )}
      <p>
        Time Allowed (s):
        {timeAllotment || game.defaultTimeAllotment}
      </p>
      <p>
        Type:
        {questionTypes[type]?.label || questionTypes[game.defaultQuestionType]?.label}
      </p>
      <p>
        Point Value:
        {pointValue || 1}
      </p>
    </>
  );
}

TooltipTitle.defaultProps = {
  compareThreshold: PropTypes.null,
  timeAllotment: null,
  type: null,
  pointValue: null,
};

TooltipTitle.propTypes = {
  compareThreshold: PropTypes.number,
  timeAllotment: PropTypes.number,
  type: PropTypes.string,
  pointValue: PropTypes.number,
  game: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TooltipTitle;
