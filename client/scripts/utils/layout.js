import findKey from 'lodash/findKey';

const layouts = {
  auth: ['/signin', '/signup', '/reset'],
  survey: [
    '/newaccount/basicinfo',
    '/survey/employment',
    '/survey/risks',
    '/survey/check',
    '/survey/banks',
    '/survey/accounts',
    '/survey/docusign',
  ],
  terms: [],
  feedback: [],
  dashboard: [
    '/dashboard',
  ],
  accounts: [
    '/accounts/savings',
    '/accounts/investment',
    '/accounts/retirement',
  ],
  funding: [
    '/funding/add',
    '/funding/transfer',
    '/funding/withdraw',
    '/funding/transactions',
  ],
  moneytype: [
    '/moneytype',
  ],
};

function getLayout(pathname) {
  return findKey(layouts, locations => locations.includes(pathname)) || 'notFound';
}

export default getLayout;
