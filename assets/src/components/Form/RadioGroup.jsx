import React, { Fragment } from 'react';
import { Field } from 'formik';
import { FormControlLabel, Radio, Typography, Tooltip } from '@material-ui/core';
import { RadioGroup as FmuiRadioGroup } from 'formik-material-ui';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OptionContainer = styled.div`
  display: ${(props) => (props.fromoptionpicker ? 'block' : 'inline')};
`;

const StyledIconSpan = styled.p`
  margin-right: 50px;
  display: inline;
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
  isFromOptionPicker,
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
          <OptionContainer fromoptionpicker={isFromOptionPicker ? 'true' : ''}>
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
          </OptionContainer>
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
