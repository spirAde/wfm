const validate = ({ amount, account }) => {
  const errors = {};

  if (!parseFloat(amount)) errors.amount = 'Required.';
  if (!account) errors.account = 'Required.';

  return errors;
};

export default validate;
