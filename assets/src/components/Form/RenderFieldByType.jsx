import React from 'react';
import PropTypes from 'prop-types';

import TextField from './TextField';
import Select from './Select';
import Slider from './Slider';
import DateTimePicker from './DateTimePicker';
import SubmitButton from './SubmitButton';

function RenderFieldByType({
  field,
  values,
  setFieldValue,
  submitForm,
  isSubmitting,
}) {
  switch (field.type) {
    case 'text':
    case 'password':
      return <TextField field={field} />;
    case 'select':
      return <Select field={field} />;
    case 'slider':
      return (
        <Slider
          field={field}
          setFieldValue={setFieldValue}
          values={values}
        />
      );
    case 'dateTimePicker':
      return (
        <DateTimePicker
          field={field}
          setFieldValue={setFieldValue}
          values={values}
        />
      );
    case 'submitButton':
      return (
        <SubmitButton
          submitForm={submitForm}
          isSubmitting={isSubmitting}
          buttonText={field.buttonText}
        />
      );
    default:
      return <div />;
  }
}

RenderFieldByType.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default RenderFieldByType;
