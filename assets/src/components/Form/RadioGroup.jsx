import React, { Fragment } from 'react';
import { Field } from 'formik';
import { FormControlLabel, Radio, Typography, Tooltip } from '@material-ui/core';
import { RadioGroup as FmuiRadioGroup } from 'formik-material-ui';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledIconSpan = styled.p`
  margin-right: 50px;
`;

const TooltipText = styled.p`
  font-size: 16px;
  line-height: 20px;
`;

function RadioGroup({
  field: {
    name,
    label,
    options,
  },
  isSubmitting,
}) {
  const getTooltipHtml = (title) => (
    <Fragment>
      <TooltipText>{title}</TooltipText>
    </Fragment>
  );

  return (
    <>
      <Typography gutterBottom>
        {label}
      </Typography>
      <Field component={FmuiRadioGroup} name={name}>
        {options.map((option) => (
          <>
          <FormControlLabel
            value={option.value}
            control={<Radio disabled={isSubmitting} />}
            label={option.label}
            disabled={isSubmitting}
          />
          {option.description
          && (
            <Tooltip title={getTooltipHtml(option.description)}>
              <StyledIconSpan><i className="far fa-question-circle"></i></StyledIconSpan>
            </Tooltip>
          )}
          </>
        ))}
      </Field>
    </>
  );
}

RadioGroup.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default RadioGroup;
