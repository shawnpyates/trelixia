import React from 'react';
import { useFormikContext } from 'formik';

import { questionTypes, questionTooltipLabels } from '../../content';

function TooltipTitle() {
  const {
    values: {
      compareThreshold, timeAllotment, type, pointValue,
    },
  } = useFormikContext();
  const fields = {
    compareThreshold,
    timeAllotment,
    type: questionTypes[type]?.label,
    pointValue: pointValue || 1,
  };
  return (
    <>
      {Object.keys(fields).map((key) => (
        fields[key] && (
          <p>
            {questionTooltipLabels[key]}
            {fields[key]}
          </p>
        )
      ))}
    </>
  );
}

export default TooltipTitle;
