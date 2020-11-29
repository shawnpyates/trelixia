import React from 'react';
import { Field, useFormikContext } from 'formik';
import { FormControlLabel, Slider as MuiSlider, Typography } from '@material-ui/core';
import { Switch } from 'formik-material-ui';
import PropTypes from 'prop-types';

const displayCurrentValue = (value, decimalPlaces) => (
  decimalPlaces ? value?.toFixed(decimalPlaces) : value
);

function Slider({
  field: {
    toggle,
    name,
    slider: {
      id,
      label,
      decimalPlaces,
      step,
      min,
      max,
    },
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
          <Typography id={id} gutterBottom>
            {`${label}: ${displayCurrentValue(values[name], decimalPlaces)}`}
          </Typography>
          <MuiSlider
            name={name}
            step={step}
            value={values[name]}
            aria-labelledby={id}
            min={min}
            max={max}
            onChange={(_event, val) => {
              setFieldValue(name, val);
            }}
          />
        </>
      )}
    </>
  );
}

Slider.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Slider;
