import { ValidationError } from 'yup'

interface ValidationErrorsProps {
  [key: string] : string;
}

export default function getValidationErrors(error: ValidationError): ValidationErrorsProps{

  const validationErrors : ValidationErrorsProps = {}

  error.inner.forEach((erro) => {
    validationErrors[erro.path] = erro.message
  })

  return validationErrors
}

