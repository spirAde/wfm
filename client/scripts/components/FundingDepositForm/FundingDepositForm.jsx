import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reset, formValueSelector } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';

import numeral from 'numeral';

import { deposit } from '../../actions/funding';
import { createRecurringTransactionGroup } from '../../actions/recurring';

import WizardWay from '../../utils/wizardWay';
import { matchStrict } from '../../utils/match';
import { getClosestRecurringDate, getPeriodicityText } from '../../utils/helpers/recurring';

import {
  StepSelectAmount,
  StepSelectAccount,
  StepConfirmDeposit,
  StepFinish,
} from './Steps';

const FORM_NAME = 'funding-deposit-form';

const STEP_SELECT_AMOUNT = {
  name: 'STEP_SELECT_AMOUNT',
  next: null,
  prev: null,
};

const STEP_SELECT_ACCOUNT = {
  name: 'STEP_SELECT_ACCOUNT',
  next: null,
  prev: STEP_SELECT_AMOUNT,
};

const STEP_CONFIRM_DEPOSIT = {
  name: 'STEP_CONFIRM_DEPOSIT',
  next: null,
  prev: null,
};

const STEP_FINISH = {
  name: 'STEP_FINISH',
  next: null,
  prev: null,
};

/*eslint-disable */
STEP_SELECT_AMOUNT.next = isPredefinedAccount => isPredefinedAccount ? STEP_CONFIRM_DEPOSIT : STEP_SELECT_ACCOUNT;
STEP_SELECT_ACCOUNT.next = STEP_CONFIRM_DEPOSIT;

STEP_CONFIRM_DEPOSIT.prev = isPredefinedAccount => isPredefinedAccount ? STEP_SELECT_AMOUNT : STEP_SELECT_ACCOUNT;
STEP_CONFIRM_DEPOSIT.next = STEP_FINISH;
/*eslint-enable */

const STEPS = {
  STEP_SELECT_AMOUNT,
  STEP_SELECT_ACCOUNT,
  STEP_CONFIRM_DEPOSIT,
  STEP_FINISH,
};

const stepsWay = new WizardWay(STEPS, STEP_SELECT_AMOUNT);

class FundingDepositForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: stepsWay.getCurrent().name,
    };

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleClickFinish = this.handleClickFinish.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    stepsWay.setCurrent(STEP_SELECT_AMOUNT);

    return dispatch(reset(FORM_NAME));
  }

  checkIsPredefinedAccount() {
    const { accountType } = this.props;

    return !!accountType;
  }

  handleNextPage(event) {
    if (event) event.preventDefault();

    const isPredefinedAccount = this.checkIsPredefinedAccount();

    this.setState({
      step: stepsWay.getNext(isPredefinedAccount).name,
    });
  }

  handlePrevPage(event) {
    event.preventDefault();

    const isPredefinedAccount = this.checkIsPredefinedAccount();

    this.setState({
      step: stepsWay.getPrev(isPredefinedAccount).name,
    });
  }

  handleClickFinish(event) {
    event.preventDefault();

    const { dispatch } = this.props;

    stepsWay.setCurrent(STEP_SELECT_AMOUNT);

    dispatch(reset(FORM_NAME));

    this.setState({
      step: stepsWay.getCurrent().name,
    });
  }

  handleClickSubmit({ amount, isRecurring, periodicity, day, account }) {
    const { dispatch } = this.props;

    const requestTrigger = isRecurring
      ? createRecurringTransactionGroup({ amount, periodicity, day, account })
      : deposit({ amount, account });

    return dispatch(requestTrigger).then(() => this.handleNextPage());
  }

  render() {
    const { step } = this.state;
    const { amount, periodicity, day, account, isRecurring, accountType } = this.props;

    return matchStrict(step, {
      STEP_SELECT_AMOUNT: (
        <StepSelectAmount
          periodicity={periodicity}
          isRecurring={isRecurring}
          onSubmit={this.handleNextPage}
        />
      ),
      STEP_SELECT_ACCOUNT: (
        <StepSelectAccount
          amount={amount}
          periodicityText={getPeriodicityText(periodicity, day)}
          isRecurring={isRecurring}
          onSubmit={this.handleNextPage}
          onClickPrevPage={this.handlePrevPage}
        />
      ),
      STEP_CONFIRM_DEPOSIT: (
        <StepConfirmDeposit
          isRecurring={isRecurring}
          amount={amount}
          account={accountType || account}
          periodicityText={getPeriodicityText(periodicity, day)}
          closestRecurringDate={getClosestRecurringDate(periodicity, day)}
          onSubmit={this.handleClickSubmit}
          onClickPrevPage={this.handlePrevPage}
        />
      ),
      STEP_FINISH: (
        <StepFinish
          isRecurring={isRecurring}
          onClickFinish={this.handleClickFinish}
        />
      ),
    }, null);
  }
}

FundingDepositForm.displayName = 'FundingDepositForm';

FundingDepositForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  accountType: PropTypes.oneOf(['savings', 'investment', 'retirement', undefined]),
  amount: PropTypes.number,
  periodicity: PropTypes.oneOf(['weekly', 'biweekly', 'monthly']),
  day: PropTypes.oneOf(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'start', 'middle', 'end']),
  account: PropTypes.oneOf(['savings', 'investment', 'retirement', undefined]),
  isRecurring: PropTypes.bool,
};

FundingDepositForm.defaultProps = {
  accountType: undefined,
  amount: undefined,
  periodicity: undefined,
  day: undefined,
  account: undefined,
  isRecurring: false,
};

const selector = formValueSelector(FORM_NAME);

export default connect(state => ({
  // numeral because we get data from input field using selector,
  // not onChange event with formatted value
  amount: numeral(selector(state, 'amount')).value(),
  periodicity: selector(state, 'periodicity'),
  day: selector(state, 'day'),
  account: selector(state, 'account'),
  isRecurring: selector(state, 'isRecurring'),
}))(FundingDepositForm);
