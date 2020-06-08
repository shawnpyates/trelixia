import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Formik, Form, useFormikContext } from 'formik';

import PropTypes from 'prop-types';

import { FieldContainer, OptionsPickerContainer, optionPickerTheme } from './styledComponents';
import RenderFieldByType from './RenderFieldByType';

const isInvalidIntValue = (n) => !(n > 0 && n <= 10000) || !Number.isInteger(n);

const PickerContext = ({ handleChange, index }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    const clonedVals = { ...values };
    if (isInvalidIntValue(Number(clonedVals.pointValue))) {
      delete clonedVals.pointValue;
    }
    handleChange(clonedVals, index);
  }, [values])
  return null;
};

function OptionsPicker({
  fields,
  initialValues,
  handleChange,
  index,
}) {
  return (
    <OptionsPickerContainer>
      <ThemeProvider theme={optionPickerTheme}>
        <Formik initialValues={initialValues}>
          {({
            setFieldValue,
            values,
            errors,
          }) => (
            <Form>
              {fields.map((field) => (
                <FieldContainer key={field.name}>
                  <RenderFieldByType
                    errors={errors}
                    field={field}
                    values={values}
                    setFieldValue={setFieldValue}
                    defaultValue={initialValues[field.name]}
                    initialValues={initialValues}
                    isFromOptionPicker
                  />
                </FieldContainer>
              ))}
              <PickerContext handleChange={handleChange} index={index} />
            </Form>
          )}
        </Formik>
      </ThemeProvider>
    </OptionsPickerContainer>
  );
}

OptionsPicker.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.any).isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OptionsPicker;