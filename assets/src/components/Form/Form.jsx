import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';

import { theme, FormContainer, FieldContainer } from './styledComponents';
import RenderFieldByType from './RenderFieldByType';

function Form({
  handleSubmit,
  fields,
  validate,
  initialValues,
  title,
}) {
  return (
    <FormContainer>
      <ThemeProvider theme={theme}>
        <h2>{title}</h2>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({
              submitForm,
              isSubmitting,
              setFieldValue,
              values,
            }) => (
              <FormikForm>
                {fields.map((field) => (
                  <FieldContainer>
                    <RenderFieldByType
                      field={field}
                      values={values}
                      setFieldValue={setFieldValue}
                      submitForm={submitForm}
                      isSubmitting={isSubmitting}
                    />
                  </FieldContainer>
                ))}
              </FormikForm>
            )}
          </Formik>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </FormContainer>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.any).isRequired,
  initialValues: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};

export default Form;
