import React from 'react';
import { useFormikContext } from 'formik';
import { Select as FormikSelect } from 'formik-material-ui';
import { FormControl, MenuItem, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';

import { StyledField, StyledInputLabel } from './styledComponents';
import { capitalize } from '../../utils';

function Select({ field: { name, label, options } }) {
  const { errors, touched } = useFormikContext();
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
          <MenuItem value={option} key={option}>{capitalize(option)}</MenuItem>
        ))}
      </StyledField>
      {(errors[name] && touched[name])
      && (
        <FormHelperText className="Mui-error">{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
}


Select.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Select;
