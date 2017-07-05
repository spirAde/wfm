const validate = ({ email, pwd }) => {
  const errors = {};
  const emailRegexp = /^([\w\.+-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i; // eslint-disable-line max-len

  if (!email) {
    errors.email = 'Your email address is required';
  } else if (!emailRegexp.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!pwd) {
    errors.pwd = 'Your password is required.';
  } else if (pwd && pwd.length < 8) {
    errors.pwd = 'Password must be at least 8 characters long.';
  } else if (!/^(?=.*[A-Z]).*$/.test(pwd) || !/^(?=.*[0-9]).*$/.test(pwd)) {
    errors.pwd = 'Your password doesn\'t meet the requirements.';
  }

  return errors;
};

export default validate;
