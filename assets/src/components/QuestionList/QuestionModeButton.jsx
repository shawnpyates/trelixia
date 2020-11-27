import React from 'react';
import PropTypes from 'prop-types';

import { ListButton } from './styledComponents';

function QuestionModeButton({ mode, setCurrentMode }) {
  return (
    <ListButton
      onClick={() => {
        setCurrentMode(mode);
      }}
    >
      {mode}
    </ListButton>
  );
}

QuestionModeButton.propTypes = {
  mode: PropTypes.objectOf(PropTypes.string).isRequired,
  setCurrentMode: PropTypes.func.isRequired,
};

export default QuestionModeButton;
