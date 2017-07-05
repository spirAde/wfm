const validate = ({ existPrevAmount, prevAmount, amount }, { limit }) => {
  const errors = {};

  if (typeof existPrevAmount !== 'boolean') errors.existPrevAmount = 'Required.';

  if (existPrevAmount && !parseFloat(prevAmount)) errors.prevAmount = 'Required.';

  if (!parseFloat(amount)) errors.amount = 'Required.';

  // if (parseFloat(prevAmount) + parseFloat(amount) > limit) errors.amount = '';

  return errors;
};

export default validate;
