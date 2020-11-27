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
  validationSchema,
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
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              submitForm,
              isSubmitting,
              setFieldValue,
              values,
              errors,
              touched,
              dirty,
              isValid,
            }) => (
              <FormikForm>
                {fields.map((field) => (
                  <FieldContainer key={field.name}>
                    <RenderFieldByType
                      errors={errors}
                      touched={touched}
                      field={field}
                      values={values}
                      setFieldValue={setFieldValue}
                      submitForm={submitForm}
                      isSubmitting={isSubmitting}
                      initialValues={initialValues}
                      dirty={dirty}
                      isValid={isValid}
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
  validationSchema: PropTypes.objectOf(PropTypes.any).isRequired,
  fields: PropTypes.arrayOf(PropTypes.any).isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};

export default Form;
