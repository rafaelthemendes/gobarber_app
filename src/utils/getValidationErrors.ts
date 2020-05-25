import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string;
}

export default (error: ValidationError): ValidationErrors => {
  const validationErrors: ValidationErrors = {};
  error.inner.forEach((inner) => {
    validationErrors[inner.path] = inner.message;
  });
  return validationErrors;
};
