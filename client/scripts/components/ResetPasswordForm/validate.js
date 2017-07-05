const validate = ({ email }) => {
  const errors = {};
  const emailRegexp = /^([\w\.+-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i; // eslint-disable-line max-len

  if (!email) {
    errors.email = 'Your email address is required';
  } else if (!emailRegexp.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  return errors;
};

export default validate;
