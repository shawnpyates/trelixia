import React from 'react';
import { TableRow as MuiTableRow } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { ToastContainer, toast } from 'react-toastify';

import { SideContent, ContentTableCell, StyledDeleteIcon } from './styledComponents';
import { questionSetModes, toastMessages } from '../../content';
import { DELETE_QUESTION } from '../../api';

function TableRow({ questions, currentMode }) {
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: ['Game'],
    onCompleted: () => {
      toast(toastMessages.deleteQuestion, { autoClose: 2000, hideProgressBar: true });
    },
  });

  const handleDelete = ({ currentTarget: { id } }) => {
    deleteQuestion({ variables: { id } });
  };

  return (
    questions.map(({
      id,
      questionText,
      answer,
      topic = 'n/a',
    }) => (
      <>
        <MuiTableRow key={id}>
          {[questionSetModes.VIEW, questionSetModes.ADD].includes(currentMode)
        && (
          <>
            {[questionText, answer, topic].map((field) => (
              <ContentTableCell key={field} columnlength={3}>
                {field}
              </ContentTableCell>
            ))}
            <SideContent>
              <StyledDeleteIcon id={id} onClick={handleDelete} />
            </SideContent>
          </>
        )}
        </MuiTableRow>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />

      </>
    ))
  );
}

export default TableRow;
