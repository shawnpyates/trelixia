import React from 'react';
import { TextField as FormikTextField } from 'formik-material-ui';
import { Typography } from '@material-ui/core';

import PropTypes from 'prop-types';

import { StyledField } from './styledComponents';

function TextField({
  field: {
    name,
    label,
    type,
    headerLabel,
  },
}) {
  return (
    <>
      {headerLabel
      && (
        <Typography gutterBottom>
          {headerLabel}
        </Typography>
      )}
      <StyledField
        name={name}
        type={type}
        label={label}
        component={FormikTextField}
      />
    </>
  );
}

TextField.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TextField;
