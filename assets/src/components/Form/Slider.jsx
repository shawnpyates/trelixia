import React from 'react';
import { Field } from 'formik';
import { FormControlLabel, Slider as MuiSlider, Typography } from '@material-ui/core';
import { Switch } from 'formik-material-ui';
import PropTypes from 'prop-types';

const displayCurrentValue = (value, decimalPlaces) => (
  decimalPlaces ? value.toFixed(decimalPlaces) : value
);

function Slider({
  field: {
    toggle,
    slider: {
      id,
      label,
      name,
      decimalPlaces,
      step,
      defaultValue,
      min,
      max,
    },
  },
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
          <Typography id={id} gutterBottom>
            {`${label}: ${displayCurrentValue(values[name], decimalPlaces)}`}
          </Typography>
          <MuiSlider
            name={name}
            step={step}
            defaultValue={defaultValue}
            aria-labelledby={id}
            min={min}
            max={max}
            onChange={(_event, value) => {
              setFieldValue(name, value);
            }}
          />
        </>
      )}
    </>
  );
}

Slider.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Slider;
