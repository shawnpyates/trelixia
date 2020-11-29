import React from 'react';
import PropTypes from 'prop-types';

import TextField from './TextField';
import Select from './Select';
import Slider from './Slider';
import DateTimePicker from './DateTimePicker';
import SubmitButton from './SubmitButton';
import RadioGroup from './RadioGroup';

function RenderFieldByType({ field, isFromOptionPicker }) {
  switch (field.type) {
    case 'text':
    case 'password':
      return <TextField field={field} />;
    case 'select':
      return <Select field={field} />;
    case 'slider':
      return <Slider field={field} />;
    case 'dateTimePicker':
      return <DateTimePicker field={field} />;
    case 'radioGroup':
      return <RadioGroup field={field} isFromOptionPicker={isFromOptionPicker} />;
    case 'submitButton':
      return <SubmitButton buttonText={field.buttonText} />;
    default:
      return <div />;
  }
}

RenderFieldByType.defaultProps = {
  isFromOptionPicker: false,
};

RenderFieldByType.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
  isFromOptionPicker: PropTypes.bool,
};

export default RenderFieldByType;
