import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { StyledButton } from './styledComponents';

function SubmitButton({ buttonText }) {
  const {
    isSubmitting,
    dirty,
    isValid,
    handleSubmit,
  } = useFormikContext();
  return (
    <StyledButton
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      disabled={isSubmitting || !dirty || !isValid}
      pageEnd="true"
    >
      {buttonText}
    </StyledButton>
  );
}

SubmitButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default SubmitButton;
