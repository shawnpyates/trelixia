import React, { useCallback, useState } from 'react';
import {
  Popover,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { CREATE_QUESTION, EDIT_QUESTION } from '../../api';
import {
  ListButton,
  SideContent,
  StyledTextarea,
  ContentTableCell,
} from './styledComponents';
import { questionSchema } from '../../validationSchemas';
import TooltipTitle from './TooltipTitle';
import OptionsPicker from '../Form/OptionsPicker';
import { questionSetModes, toastMessages } from '../../content';

function EditableRow({
  row,
  isLast,
  index,
  currentMode,
  addNewRow,
  removeEditableRowCallback,
}) {
  const refId = row.id || row.shortid;
  const [popoverEl, setPopoverEl] = useState(null);
  const { id } = useParams();

  const {
    buttonText,
    shouldDisplayNewRowButton,
    shouldRemoveTempRowOnSubmit,
  } = (
    currentMode === questionSetModes.ADD
      ? {
        buttonText: 'Add',
        shouldRemoveTempRowOnSubmit: true,
        shouldDisplayNewRowButton: isLast,
      } : {
        buttonText: 'Edit',
      }
  );

  const handleMutationComplete = (data) => {
    if (shouldRemoveTempRowOnSubmit) {
      removeEditableRowCallback(index);
    }
    toast(toastMessages[Object.keys(data)[0]], { autoClose: 2000, hideProgressBar: true });
  };

  const questionMutationOptions = {
    refetchQueries: ['Game'],
    onCompleted: handleMutationComplete,
  };

  const [createQuestion] = useMutation(CREATE_QUESTION, questionMutationOptions);
  const [editQuestion] = useMutation(EDIT_QUESTION, questionMutationOptions);

  const handleOptionsOpen = () => {
    setPopoverEl(refId);
  };

  const handleOptionsClose = () => {
    setPopoverEl(null);
  };

  const handleQuestionSubmit = useCallback(async ({ pointValue, ...rest }) => {
    const mutation = currentMode === questionSetModes.ADD ? createQuestion : editQuestion;
    await mutation({ variables: { ...rest, gameId: id, pointValue: Number(pointValue) } });
  }, [createQuestion, currentMode, editQuestion, id]);

  return (
    <>
      <Formik
        initialValues={row}
        validationSchema={questionSchema}
        onSubmit={handleQuestionSubmit}
      >
        {({
          values, dirty, isValid, handleSubmit, setFieldValue,
        }) => (
          <TableRow>
            {['questionText', 'answer', 'topic'].map((field) => (
              <ContentTableCell key={field} columnlength={3} islast={String(isLast || '')}>
                <StyledTextarea
                  value={values[field]}
                  onChange={({ target: { value } }) => {
                    setFieldValue(field, value);
                  }}
                  rowsMin={3}
                />
              </ContentTableCell>
            ))}
            <SideContent>
              <Tooltip title={<TooltipTitle />}>
                <ListButton
                  aria-describedby={popoverEl && 'options-popover'}
                  value={refId}
                  id={refId}
                  onClick={handleOptionsOpen}
                >
                  Other Options
                </ListButton>
              </Tooltip>
              <Popover
                id={refId}
                open={Boolean(popoverEl) && refId === popoverEl}
                anchorEl={popoverEl}
                onClose={handleOptionsClose}
                value={refId}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <OptionsPicker />
              </Popover>
            </SideContent>
            <SideContent>
              <ListButton
                createnewitem="true"
                disabled={!dirty || !isValid}
                onClick={handleSubmit}
              >
                {buttonText}
              </ListButton>
            </SideContent>
          </TableRow>
        )}
      </Formik>
      {shouldDisplayNewRowButton
      && (
        <TableRow key="addnew">
          <ContentTableCell columnlength={3} fornewrowbutton="true">
            <ListButton addnewrow="true" onClick={addNewRow}>+ New Row</ListButton>
          </ContentTableCell>
          <ContentTableCell columnlength={3} />
          <ContentTableCell columnlength={3} />
        </TableRow>
      )}
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}

EditableRow.propTypes = {
  currentMode: PropTypes.string.isRequired,
  row: PropTypes.objectOf(PropTypes.any).isRequired,
  isLast: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  addNewRow: PropTypes.func.isRequired,
  removeEditableRowCallback: PropTypes.func.isRequired,
};

export default EditableRow;
