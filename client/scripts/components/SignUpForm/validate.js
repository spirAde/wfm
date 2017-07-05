const validate = ({ firstName, lastName, email, pwd, confirmPwd }) => {
  const errors = {};

  const emailRegexp = /^([\w\.+-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i; // eslint-disable-line max-len

  if (!firstName) {
    errors.firstName = 'Your first name is required';
  }

  if (!lastName) {
    errors.lastName = 'Your last name is required';
  }

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

  if (pwd && !confirmPwd) {
    errors.confirmPwd = 'Your confirm password is required.';
  } else if (confirmPwd && confirmPwd.length < 8) {
    errors.confirmPwd = 'Confirm password must be at least 8 characters long.';
  } else if (!/^(?=.*[A-Z]).*$/.test(pwd) || !/^(?=.*[0-9]).*$/.test(pwd)) {
    errors.confirmPwd = 'Your confirm password doesn\'t meet the requirements.';
  } else if (pwd !== confirmPwd) {
    errors.confirmPwd = 'Your passwords don\'t match.';
  }

  return errors;
};

export default validate;
