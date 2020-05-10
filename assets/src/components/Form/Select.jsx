import React from 'react';
import { Select as FormikSelect } from 'formik-material-ui';
import { FormControl, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';

import { StyledField, StyledInputLabel } from './styledComponents';

function Select({ field: { name, label, options } }) {
  return (
    <FormControl>
      <StyledInputLabel htmlFor={name}>
        {label}
      </StyledInputLabel>
      <StyledField
        component={FormikSelect}
        name={name}
        color="secondary"
        inputProps={{
          id: name,
        }}
      >
        {options.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </StyledField>
    </FormControl>
  );
}

Select.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Select;
