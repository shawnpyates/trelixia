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
    MuiFormControlLabel: {
      root: {
        marginRight: '10px',
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
    MuiFormGroup: {
      root: {
        flexDirection: 'unset',
      },
    },
    MuiButton: {
      label: {
        color: '#000',
      },
    },
    PrivateRadioButtonIcon: {
      root: {
        color: 'lightgray',
      },
    },
  },
});

export const optionPickerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#000',
    },
  },
  overrides: {
    MuiFormGroup: {
      root: {
        flexDirection: 'unset',
      },
    },
  },
});

export const FormContainer = styled.div`
  height: 500px;
  width: 500px;
`;

export const OptionsPickerContainer = styled.div`
  height: 250px;
  width: 380px;
  padding: 20px;
`;

export const StyledField = styled(Field)`
  display: block;
  margin: 20px auto;
`;

export const StyledButton = styled(Button)`
  margin-top: 35px;
  ${({ pageEnd }) => pageEnd ? 'margin-bottom: 100px;' : ''}
  ${({ disabled }) => disabled ? 'background-color: #CCC' : ''}
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
