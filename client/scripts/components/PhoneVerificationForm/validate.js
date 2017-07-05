const validate = ({ code }) => {
  const errors = {};

  if (!code) {
    errors.code = 'Required.';
  }

  return errors;
};

export default validate;
