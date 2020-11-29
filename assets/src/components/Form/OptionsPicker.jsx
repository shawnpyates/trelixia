import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { useFormikContext } from 'formik';

import { FieldContainer, OptionsPickerContainer, optionPickerTheme } from './styledComponents';
import RenderFieldByType from './RenderFieldByType';
import { questionOptionsForm as optionsForm } from '../../content';

function OptionsPicker() {
  const {
    values,
    setFieldValue,
    errors,
  } = useFormikContext();

  return (
    <OptionsPickerContainer>
      <ThemeProvider theme={optionPickerTheme}>
        {optionsForm.fields.map((field) => (
          <FieldContainer key={field.name}>
            <RenderFieldByType
              errors={errors}
              field={field}
              value={values[field.name]}
              setFieldValue={setFieldValue}
              isFromOptionPicker
            />
          </FieldContainer>
        ))}
      </ThemeProvider>
    </OptionsPickerContainer>
  );
}

export default OptionsPicker;
