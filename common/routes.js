if (typeof require.ensure !== 'function') require.ensure = (defn, chunk) => chunk(require);

import findIndex from 'lodash/findIndex';

import { getAsyncInjectors } from '../client/scripts/utils/asyncInjectors';

import App from '../client/scripts/containers/App';

import SignInPage from '../client/scripts/containers/SignInPage/SignInPage';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

export default (store) => {
  const { injectReducer } = getAsyncInjectors(store);

  const checkOnboardingAvailableStep = (nextState, replace, callback) => {
    const state = store.getState();

    console.log(state);

    const { pathname } = nextState.location;

    if (pathname !== '/welcome') {
      const {
        navigation,
        availableStep: [availableGroupIndex, availableStepIndex],
        currentStep: [currentGroupIndex, currentStepIndex],
      } = state.survey;

      const groups = navigation.map(group => group.steps);
      const groupIndex = findIndex(groups, group => group.includes(pathname));
      const stepIndex = findIndex(navigation[groupIndex].steps, step => step === pathname);

      if (availableGroupIndex < groupIndex || (availableStepIndex === groupIndex && availableStepIndex < stepIndex)) {
        const redirect = navigation[currentGroupIndex].steps[currentStepIndex];
        replace(redirect);
      }
    }

    callback();
  };

  const SignInRoute = {
    path: '/signin',
    component: SignInPage,
  };

  const SignUpRoute = {
    path: '/signup',
    //component: SignUpPage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/SignUpPage/SignUpPage'))
      }, 'signup');
    },
  };
  
  const ResetPasswordPageRoute = {
    path: '/reset',
    //component: ResetPasswordPage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/ResetPasswordPage/ResetPasswordPage'))
      }, 'reset-password');
    },
  };

  const WelcomePageRoute = {
    path: '/welcome',
    //component: WelcomePage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/WelcomePage/WelcomePage'))
      }, 'welcome-page');
    },
  };

  const BasicInformationPageRoute = {
    path: '/newaccount/basicinfo',
    //component: BasicInformationPage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/BasicInformationPage/BasicInformationPage'))
      }, 'basicinfo-page');
    },
  };

  const EmploymentInformationPageRoute = {
    path: '/survey/employment',
    //component: EmploymentInformationPage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/EmploymentInformationPage/EmploymentInformationPage'))
      }, 'employment-page');
    },
  };

  const RisksInformationPageRoute = {
    path: '/survey/risks',
    //component: RisksInformationPage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/RisksInformationPage/RisksInformationPage'))
      }, 'risks-page');
    },
  };

  const ConnectBankPageRoute = {
    path: '/survey/banks',
    //component: ConnectBankPage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/ConnectBankPage/ConnectBankPage'))
      }, 'banks-page');
    },
  };

  const CheckInformationPageRoute = {
    path: '/survey/check',
    //component: CheckInformationPage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/CheckInformationPage/CheckInformationPage'))
      }, 'check-page');
    },
  };

  const AccountsPageRoute = {
    path: '/survey/accounts',
    //component: AccountsPage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/AccountsPage/AccountsPage'))
      }, 'accounts-page');
    },
  };

  const DocuSignPageRoute = {
    path: '/survey/docusign',
    //component: AccountsPage,
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/DocuSignPage/DocuSignPage'))
      }, 'docusign-page');
    },
  };

  const OnboardingWrapperRoute = {
    //component: OnboardingWrapper,
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/OnboardingWrapper/OnboardingWrapper',
        '../client/scripts/reducers/onboarding',
      ], require => {
        const OnboardingWrapper = require('../client/scripts/containers/OnboardingWrapper/OnboardingWrapper');
        const onboardingReducer = require('../client/scripts/reducers/onboarding');

        injectReducer('onboarding', onboardingReducer.default);

        callback(null, OnboardingWrapper);
      }, 'onboarding');
    },
    //onEnter: checkOnboardingAvailableStep,
    childRoutes: [
      WelcomePageRoute,
      BasicInformationPageRoute,
      EmploymentInformationPageRoute,
      RisksInformationPageRoute,
      ConnectBankPageRoute,
      CheckInformationPageRoute,
      AccountsPageRoute,
      DocuSignPageRoute,
    ],
  };

  const DashboardPageRoute = {
    path: '/dashboard',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/DashboardPage/DashboardPage',
      ], require => {
        const DashboardPage = require('../client/scripts/containers/DashboardPage/DashboardPage');

        callback(null, DashboardPage);
      }, 'dashboard');
    },
  };

  const AccountSavingsPageRoute = {
    path: '/accounts/savings',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/AccountSavingsPage/AccountSavingsPage',
      ], require => {
        const AccountSavingsPage = require('../client/scripts/containers/AccountSavingsPage/AccountSavingsPage');

        callback(null, AccountSavingsPage);
      }, 'savings');
    },
  };

  const AccountInvestmentPageRoute = {
    path: '/accounts/investment',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/AccountInvestmentPage/AccountInvestmentPage',
      ], require => {
        const AccountInvestmentPage = require('../client/scripts/containers/AccountInvestmentPage/AccountInvestmentPage');

        callback(null, AccountInvestmentPage);
      }, 'investment');
    },
  };

  const AccountRetirementPageRoute = {
    path: '/accounts/retirement',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/AccountRetirementPage/AccountRetirementPage',
      ], require => {
        const AccountRetirementPage = require('../client/scripts/containers/AccountRetirementPage/AccountRetirementPage');

        callback(null, AccountRetirementPage);
      }, 'retirement');
    },
  };

  const FundingDepositPageRoute = {
    path: '/funding/add',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/FundingDepositPage/FundingDepositPage',
      ], require => {
        const FundingDepositPage = require('../client/scripts/containers/FundingDepositPage/FundingDepositPage');

        callback(null, FundingDepositPage);
      }, 'funding-deposit');
    },
  };

  const FundingTransferPageRoute = {
    path: '/funding/transfer',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/FundingTransferPage/FundingTransferPage',
      ], require => {
        const FundingTransferPage = require('../client/scripts/containers/FundingTransferPage/FundingTransferPage');

        callback(null, FundingTransferPage);
      }, 'funding-transfer');
    },
  };

  const FundingWithdrawPageRoute = {
    path: '/funding/withdraw',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/FundingWithdrawPage/FundingWithdrawPage',
      ], require => {
        const FundingWithdrawPage = require('../client/scripts/containers/FundingWithdrawPage/FundingWithdrawPage');

        callback(null, FundingWithdrawPage);
      }, 'funding-withdraw');
    },
  };

  const FundingTransactionsPageRoute = {
    path: '/funding/transactions',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/FundingTransactionsPage/FundingTransactionsPage',
      ], require => {
        const FundingTransactionsPage = require('../client/scripts/containers/FundingTransactionsPage/FundingTransactionsPage');

        callback(null, FundingTransactionsPage);
      }, 'funding-transactions');
    },
  };

  const ProfilePageRoute = {
    path: '/profile',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/ProfilePage/ProfilePage',
      ], require => {
        const ProfilePage = require('../client/scripts/containers/ProfilePage/ProfilePage');

        callback(null, ProfilePage);
      }, 'profile-page');
    },
  };

  const MoneyTypePageRoute = {
    path: '/moneytype',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/MoneyTypePage/MoneyTypePage',
        '../client/scripts/reducers/moneytype',
      ], require => {
        const MoneyTypePage = require('../client/scripts/containers/MoneyTypePage/MoneyTypePage');
        const moneytypeReducer = require('../client/scripts/reducers/moneytype');

        injectReducer('moneytype', moneytypeReducer.default);

        callback(null, MoneyTypePage);
      }, 'moneytype-page');
    },
  };

  const FinancesPageRoute = {
    path: '/finances',
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/FinancesPage/FinancesPage',
      ], require => {
        const FinancesPage = require('../client/scripts/containers/FinancesPage/FinancesPage');

        callback(null, FinancesPage);
      }, 'finances-page');
    },
  };

  const DashboardWrapperRoute = {
    //component: OnboardingWrapper,
    getComponent(nextState, callback) {
      require.ensure([
        '../client/scripts/containers/DashboardWrapper/DashboardWrapper',
        '../client/scripts/reducers/transaction',
        '../client/scripts/reducers/recurring',
        '../client/scripts/reducers/funding',
        '../client/scripts/reducers/account',
      ], require => {
        const DashboardWrapper = require('../client/scripts/containers/DashboardWrapper/DashboardWrapper');
        const transactionReducer = require('../client/scripts/reducers/transaction');
        const recurringReducer = require('../client/scripts/reducers/recurring');
        const fundingReducer = require('../client/scripts/reducers/funding');
        const accountReducer = require('../client/scripts/reducers/funding');

        injectReducer('transaction', transactionReducer.default);
        injectReducer('recurring', recurringReducer.default);
        injectReducer('funding', fundingReducer.default);
        injectReducer('account', accountReducer.default);

        callback(null, DashboardWrapper);
      }, 'dashboard-wrapper');
    },
    childRoutes: [
      DashboardPageRoute,

      AccountSavingsPageRoute,
      AccountInvestmentPageRoute,
      AccountRetirementPageRoute,

      FundingDepositPageRoute,
      FundingTransferPageRoute,
      FundingWithdrawPageRoute,
      FundingTransactionsPageRoute,

      ProfilePageRoute,
      MoneyTypePageRoute,
      FinancesPageRoute,
    ],
  };

  const Page404Route = {
    path: '404',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/NotFoundPage/NotFoundPage'))
      }, 'not-found-page');
    },
  };

  const NotFoundPage = {
    path: '*',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../client/scripts/containers/NotFoundPage/NotFoundPage'))
      }, 'not-found-page');
    },
  };

  return {
    path: '/',
    component: App,
    indexRoute: {
      onEnter: (nextState, replace) => replace('/signin')
    },
    childRoutes: [
      SignInRoute,
      SignUpRoute,
      ResetPasswordPageRoute,

      OnboardingWrapperRoute,
      DashboardWrapperRoute,

      Page404Route,
      NotFoundPage,
    ],
  };
}
