import {
  string, number, object, ref,
} from 'yup';

export const createUserSchema = object().shape({
  username: string()
    .required('Username is required.'),
  email: string()
    .email('Not a valid email.'),
  firstPasswordEntry: string()
    .required('Password is required.')
    .min(8, 'Must be at least 8 characters long.'),
  secondPasswordEntry: string()
    .oneOf([ref('firstPasswordEntry'), null], 'Passwords do not match.')
    .required('Must confirm password.'),
});

export const loginSchema = object().shape({
  username: string()
    .required('Username is required.'),
  password: string()
    .required('Username is required.'),
});

export const createGameSchema = object().shape({
  name: string()
  .required('Name is required.'),
  category: string()
    .required('Category is required.'),
});

export const createUsernameSchema = object().shape({
  username: string()
    .required('Username is required.'),
});

export const questionSchema = object().shape({
  questionText: string()
    .required('Question is required.'),
  answer: string()
    .required('Answer is required.'),
  topic: string(),
  compareThreshold: number(),
  timeAllotment: number(),
  type: string(),
  pointValue: number().min(1).max(10000),
});
