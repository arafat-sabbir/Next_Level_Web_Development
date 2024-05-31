import mongoose from 'mongoose';
import { TErrorSources } from '../interface/error';

const handleDuplicateError = (err: mongoose.Error.ValidationError) => {
  console.log('from Validation error', err);
  const statusCode = 400;
  const regex = /\\([^\\]*)\\/g;
  const match = err.message.match(regex);
  console.log(match, 'from handleDuplicateError');
  const errorSources: TErrorSources =
    (err.errors &&
      Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
          path: val.path,
          message: val.message,
        })
      )) ||
    [];
  return { statusCode, message: 'Validation Error', errorSources };
};

export default handleDuplicateError;
