import React from 'react';
import PropTypes from 'prop-types';

import TextField from './TextField';
import Select from './Select';
import Slider from './Slider';
import DateTimePicker from './DateTimePicker';
import SubmitButton from './SubmitButton';
import RadioGroup from './RadioGroup';

function RenderFieldByType({
  field,
  values,
  setFieldValue,
  submitForm,
  isSubmitting,
  errors,
  touched,
  isFromOptionPicker,
  initialValues,
}) {
  switch (field.type) {
    case 'text':
    case 'password':
      return <TextField field={field} />;
    case 'select':
      return <Select field={field} errors={errors} touched={touched} />;
    case 'slider':
      return (
        <Slider
          field={field}
          setFieldValue={setFieldValue}
          values={values}
          defaultValue={initialValues[field.slider.name]}
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
    case 'radioGroup':
      return (
        <RadioGroup
          field={field}
          isSubmitting={isSubmitting}
          isFromOptionPicker={isFromOptionPicker}
        />
      );
    case 'submitButton':
      return (
        <SubmitButton
          submitForm={submitForm}
          isSubmitting={isSubmitting}
          buttonText={field.buttonText}
          defaultValue={initialValues[field.name]}
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
