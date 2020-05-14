import React from 'react';
import { TextField as FormikTextField } from 'formik-material-ui';
import PropTypes from 'prop-types';

import { StyledField } from './styledComponents';

function TextField({ field: { name, label, type } }) {
  return (
    <StyledField
      name={name}
      type={type}
      label={label}
      component={FormikTextField}
    />
  );
}

TextField.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TextField;
