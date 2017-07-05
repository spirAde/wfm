const validate = ({ amount, from, to }) => {
  const errors = {};

  if (!parseFloat(amount)) errors.amount = 'Required.';
  if (!from) errors.from = 'Required.';
  if (!to) errors.to = 'Required.';

  if (from && to && from === to) {
    errors.from = 'Select accounts to transfer funds.';
  }

  return errors;
};

export default validate;
