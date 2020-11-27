import React from 'react';
import { TableRow } from '@material-ui/core';

import { SideContent, ContentTableCell, StyledDeleteIcon } from './styledComponents';
import { questionSetModes } from '../../content';

function QuestionRows({ questions, deleteQuestion, currentMode }) {
  return (
    questions.map(({
      id,
      questionText,
      answer,
      topic,
    }) => (
      <TableRow key={id}>
        {[questionSetModes.VIEW, questionSetModes.ADD].includes(currentMode)
        && (
          <>
            <ContentTableCell columnlength={3}>
              {questionText}
            </ContentTableCell>
            <ContentTableCell columnlength={3}>
              {answer}
            </ContentTableCell>
            <ContentTableCell columnlength={3}>
              {topic || 'n/a'}
            </ContentTableCell>
            <SideContent>
              <StyledDeleteIcon
                onClick={() => {
                  deleteQuestion({ variables: { id } });
                }}
              />
            </SideContent>
          </>
        )}
      </TableRow>
    ))
  );
}

export default QuestionRows;
