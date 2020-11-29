import React from 'react';
import { Field, useFormikContext } from 'formik';
import { FormControlLabel } from '@material-ui/core';
import { DateTimePicker as MuiDateTimePicker } from '@material-ui/pickers';
import { Switch } from 'formik-material-ui';
import PropTypes from 'prop-types';

function DateTimePicker({
  field: {
    toggle,
    picker: pickerConfig,
    name,
  },
}) {
  const { setFieldValue, values } = useFormikContext();
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
            value={values[name]}
            onChange={(ev) => {
              setFieldValue(name, ev);
            }}
          />
        </>
      )}
    </>
  );
}

DateTimePicker.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DateTimePicker;
