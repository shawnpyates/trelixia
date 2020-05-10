import React from 'react';
import { Field } from 'formik';
import { FormControlLabel } from '@material-ui/core';
import { DateTimePicker as MuiDateTimePicker } from '@material-ui/pickers';
import { Switch } from 'formik-material-ui';
import PropTypes from 'prop-types';

function DateTimePicker({
  field: { toggle, picker: pickerConfig },
  setFieldValue,
  values,
}) {
  return (
    <>
      {toggle
      && (
        <FormControlLabel
          control={<Field component={Switch} name={toggle.name} type="checkbox" />}
          label={toggle.label}
        />
      )}
      {(!toggle || values[toggle.name])
      && (
        <>
          <MuiDateTimePicker
            label={pickerConfig.label}
            disablePast
            value={values[pickerConfig.name]}
            onChange={(ev) => {
              setFieldValue(pickerConfig.name, ev);
            }}
          />
        </>
      )}
    </>
  );
}

DateTimePicker.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DateTimePicker;
