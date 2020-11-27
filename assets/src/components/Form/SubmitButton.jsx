import React from 'react';
import PropTypes from 'prop-types';

import { StyledButton } from './styledComponents';

function SubmitButton({
  submitForm,
  isSubmitting,
  buttonText,
  disabled,
}) {
  return (
    <StyledButton
      variant="contained"
      color="primary"
      onClick={submitForm}
      disabled={isSubmitting || disabled}
      pageEnd="true"
    >
      {buttonText}
    </StyledButton>
  );
}

SubmitButton.propTypes = {
  submitForm: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SubmitButton;
