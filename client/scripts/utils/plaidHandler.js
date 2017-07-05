function plaidHandler({
  token = null,
  onSuccess = Function.prototype,
  onExit = Function.prototype,
}) {
  if (!window.Plaid) console.warn('Plaid not found, recheck plaid cdn');

  return Plaid.create({
    clientName: __PLAID_CLIENT_NAME__,
    env: __PLAID_ENV__,
    key: __PLAID_PUBLIC_KEY__,
    product: 'auth',
    token,
    onSuccess,
    onExit,
  });
}

export default plaidHandler;
