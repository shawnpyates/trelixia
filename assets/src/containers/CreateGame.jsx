import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import { Select, Switch, TextField } from 'formik-material-ui';
import { ThemeProvider } from '@material-ui/styles';
// import { DateTimePicker } from 'formik-material-ui-pickers';
import {
  Button,
  FormControlLabel,
  InputLabel,
  FormControl,
  MenuItem,
  Slider,
  Typography,
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { CREATE_GAME } from '../api/mutations';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E0E0E0',
    },
    secondary: {
      main: '#E0E0E0',
    },
  },
  overrides: {
    MuiSlider: {
      root: {
        color: '#FFF',
        width: '70%',
      },
    },
    MuiFormControl: {
      root: {
        display: 'block'
      },
    },
    MuiInputBase: {
      input: {
        cursor: 'pointer',
        color: '#FFF',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#FFF',
      },
    },
    MuiButton: {
      label: {
        color: '#000',
      },
    },
  },
});

const GameContainer = styled.div`
  height: 500px;
  width: 500px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);

  @media only screen and (max-width: 1040px) {
    left: 10%;
  }
`;

const gameCategories = [
  'General',
  'History',
  'Sports',
  'Geography',
  'Science',
  'Music',
  'Film',
  'Literature'
];

const StyledField = styled(Field)`
  display: block;
  margin: 20px auto;
`;

const StyledButton = styled(Button)`
  margin-top: 35px;
`;

const StyledInputLabel = styled(InputLabel)`
  margin-top: -15px;
  color: #FFF;
  display: block;
`;

const FieldContainer = styled.div`
  margin-top: 35px;
  display: block;

  & .MuiInput-underline:after {
    transform: none;
  }
`;

const initialValues = {
  name: '',
  category: '',
  isAutomated: false,
  defaultCompareThreshold: 0.9,
  shouldSetMaxPlayers: false,
  maxPlayers: 50,
  shouldScheduleTime: false,
  scheduledFor: null,
  // ownerId: 6,
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name Required';
  } else if (!values.category) {
    errors.category = 'Category Required';
  }
  return errors;
}

function CreateGame() {
  const [createGame, { data }] = useMutation(CREATE_GAME);

  return (
    <GameContainer>
      <ThemeProvider theme={theme}>
        <h2>Create a New Game</h2>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
              console.log('submitting')
              setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting, setFieldValue, values }) => {
              console.log('values: ', values);
              return (<Form>
                <FieldContainer>
                  <StyledField
                    name="name"
                    type="name"
                    label="Name"
                    component={TextField}
                  />
                </FieldContainer>
                <FieldContainer>
                  <FormControl>
                    <StyledInputLabel htmlFor="category">Choose a Category</StyledInputLabel>
                    <StyledField
                      component={Select}
                      name="category"
                      color="secondary"
                      inputProps={{
                        id: 'category',
                      }}
                    >
                      {gameCategories.map((category) => (
                        <MenuItem value={category}>{category}</MenuItem>
                      ))}
                    </StyledField>
                  </FormControl>
                </FieldContainer>
                <FieldContainer>
                  <FormControlLabel
                    control={<Field component={Switch} name="isAutomated" type="checkbox" />}
                    label="Run the game in Automated Mode"
                  />
                {values.isAutomated
                && (
                  <>
                  <Typography id="slider" gutterBottom>
                    Default Required Match Score: {values.defaultCompareThreshold.toFixed(2)}
                  </Typography>
                  <Slider
                    name="defaultCompareThreshold"
                    step={0.01}
                    defaultValue={0.90}
                    aria-labelledby="slider"
                    min={0.50}
                    max={1.0}
                    onChange={(_event, value) => {
                      setFieldValue('defaultCompareThreshold', value);
                    }}
                  />
                  </>
                )}
                </FieldContainer>
                <FieldContainer>
                  <FormControlLabel
                    control={<Field component={Switch} name="shouldSetMaxPlayers" type="checkbox" />}
                    label="Set a maximum number of players allowed to participate"
                  />
                </FieldContainer>
                {values.shouldSetMaxPlayers
                && (
                  <>
                  <Typography id="slider" gutterBottom>
                    Maximum Number of Players: {values.maxPlayers}
                  </Typography>
                  <Slider
                    name="maxPlayers"
                    step={1}
                    defaultValue={50}
                    aria-labelledby="slider"
                    min={1}
                    max={100}
                    onChange={(_event, value) => {
                      setFieldValue('maxPlayers', value);
                    }}
                  />
                  </>
                )}
                <FieldContainer>
                  <FormControlLabel
                    control={<Field component={Switch} name="shouldScheduleTime" type="checkbox" />}
                    label="Schedule a time for your game to start"
                  />
                  {values.shouldScheduleTime
                  && (
                    <DateTimePicker
                      label="Schedule Game For"
                      value={values.scheduledFor}
                      onChange={(_event, value) => {
                        setFieldValue('scheduledFor', value);
                      }}
                    />
                  )}
                </FieldContainer>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={submitForm}
                  disabled={isSubmitting}
                >
                  Submit
                </StyledButton>
              </Form>);
            }}
          </Formik>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </GameContainer>
  );
}

export default CreateGame;