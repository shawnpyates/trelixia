import React from 'react';
import { Formik } from 'formik';
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
            <>
              {fields.map((field) => (
                <FieldContainer key={field.name}>
                  <RenderFieldByType field={field} />
                </FieldContainer>
              ))}
            </>
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
