const validate = ({ amount, periodicity, day, account }, { isRecurring, accountType }) => {
  const errors = {};

  if (!parseFloat(amount)) errors.amount = 'Required.';

  if (isRecurring) {
    if (!periodicity) errors.periodicity = 'Required.';
    if (!day) errors.day = 'Required.';
  }

  if (!accountType && !account) {
    errors.account = 'Required';
  }

  return errors;
};

export default validate;
