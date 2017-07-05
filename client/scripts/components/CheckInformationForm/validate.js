const validate = ({
  bankName,
  typeOfAccount,
  transitRouting,
  bankAccount,
  amountOfTransaction,
}) => {
  const errors = {};

  const routingNumberRegexp = /^\w{9}$/;
  const accountNumberRegexp = /^\w{8,17}$/;

  if (!bankName) {
    errors.bankName = 'Required.';
  }

  if (!typeOfAccount) {
    errors.typeOfAccount = 'Required.';
  }

  if (!transitRouting) {
    errors.transitRouting = 'Required.';
  } else if (transitRouting && !routingNumberRegexp.test(transitRouting)) {
    errors.transitRouting = 'Enter a valid transit routing.';
  }

  if (!bankAccount) {
    errors.bankAccount = 'Required.';
  } else if (bankAccount && !accountNumberRegexp.test(bankAccount)) {
    errors.bankAccount = 'Enter a valid account number.';
  }

  if (!amountOfTransaction) {
    errors.amountOfTransaction = 'Required.';
  } else if (amountOfTransaction && parseInt(amountOfTransaction, 10) < 50) {
    errors.amountOfTransaction = 'Minimum amount is $50. Please double check your initial funding amount.';
  }

  return errors;
};

export default validate;
