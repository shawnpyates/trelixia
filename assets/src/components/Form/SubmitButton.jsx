import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styledComponents';

function TextField({ submitForm, isSubmitting, buttonText }) {
  return (
    <StyledButton
      variant="contained"
      color="primary"
      onClick={submitForm}
      disabled={isSubmitting}
    >
      {buttonText}
    </StyledButton>
  );
}

TextField.propTypes = {
  submitForm: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default TextField;