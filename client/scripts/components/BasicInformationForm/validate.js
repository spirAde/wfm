import moment from 'moment';

const validate = ({ firstName, lastName, address, city, state, zipCode, phone, ssn, birthDate }) => {
  const errors = {};

  const zipCodeRegexp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const ssnRegexp = /(^\d{3}-?\d{2}-?\d{4}$|^XXX-XX-XXXX$)/;
  const phoneRegexp = /(^\d{3}-?\d{3}-?\d{4}$)/;

  if (!firstName) errors.firstName = 'Required.';

  if (!lastName) errors.lastName = 'Required.';

  if (!address) errors.address = 'Required.';

  if (!city) errors.city = 'Required.';

  if (!state) errors.state = 'Required.';

  if (!zipCode) {
    errors.zipCode = 'Required.';
  } else if (zipCode && !zipCodeRegexp.test(zipCode)) {
    errors.zipCode = 'Enter a valid zip code.';
  }

  if (!phone) {
    errors.phone = 'Required.';
  } else if (phone && !phoneRegexp.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!ssn) {
    errors.ssn = 'Required.';
  } else if (ssn && !ssnRegexp.test(ssn)) {
    errors.ssn = 'Enter a valid SSN.';
  }

  if (!birthDate) {
    errors.birthDate = 'Required.';
  } else {
    const momentBirthDate = moment(birthDate, 'MM/DD/YYYY', true); // strict parsing

    if (!momentBirthDate.isValid()) {
      errors.birthDate = 'Enter a valid date of birth(MM/DD/YYYY).';
    } else {
      const diff = moment().diff(momentBirthDate, 'years');

      if (diff > 100) {
        errors.birthDate = 'Thanks for your interest! You must be 100 years old or younger to create an account.';
      } else if (diff < 18) {
        errors.birthDate = 'You must be 18 years or older to create a WorthFM account.';
      }
    }
  }

  return errors;
};

export default validate;
