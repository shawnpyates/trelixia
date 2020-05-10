import styled from 'styled-components';
import { Button, InputLabel } from '@material-ui/core';
import { Field } from 'formik';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
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
        display: 'block',
      },
    },
    MuiInputBase: {
      root: {
        width: '100%',
        padding: '5px',
      },
      input: {
        cursor: 'pointer',
        color: '#FFF',
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px #36384F inset',
          WebkitTextFillColor: '#FFF',
        },
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

export const FormContainer = styled.div`
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

export const StyledField = styled(Field)`
  display: block;
  margin: 20px auto;
`;

export const StyledButton = styled(Button)`
  margin-top: 35px;
`;

export const StyledInputLabel = styled(InputLabel)`
  margin-top: -15px;
  color: #FFF;
  display: block;
`;

export const FieldContainer = styled.div`
  margin-top: 35px;
  display: block;

  & .MuiInput-underline:after {
    transform: none;
  }
`;
