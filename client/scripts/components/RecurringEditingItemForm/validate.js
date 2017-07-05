const validate = ({ amount, date }) => {
  const errors = {};

  if (!parseFloat(amount)) errors.amount = 'Required.';

  if (!date) errors.date = 'Required.';

  return errors;
};

export default validate;
