const validate = ({ amount, periodicity, day, account }) => {
  const errors = {};

  if (!parseFloat(amount)) errors.amount = 'Required.';

  if (!account) errors.account = 'Required.';

  if (!periodicity) errors.periodicity = 'Required.';

  if (!day) errors.day = 'Required.';

  return errors;
};

export default validate;
