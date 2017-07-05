import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reset, formValueSelector } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';

import numeral from 'numeral';

import { withdraw } from '../../actions/funding';

import {
  StepClientService,
  StepSelectAccount,
  StepConfirmCacheInsufficient,
  StepConfirmWithdrawFromRetirement,
  StepConfirmWithdraw,
  StepFinish,
} from './Steps';

import WizardWay from '../../utils/wizardWay';
import { matchStrict } from '../../utils/match';

const FORM_NAME = 'funding-withdraw-form';

const STEP_SELECT_ACCOUNT = {
  name: 'STEP_SELECT_ACCOUNT',
  next: null,
  prev: null,
};

const STEP_CONFIRM_CACHE_INSUFFICIENT = {
  name: 'STEP_CONFIRM_CACHE_INSUFFICIENT',
  next: null,
  prev: STEP_SELECT_ACCOUNT,
};

const STEP_CONFIRM_WITHDRAW_FROM_RETIREMENT = {
  name: 'STEP_CONFIRM_WITHDRAW_FROM_RETIREMENT',
  next: null,
  prev: STEP_SELECT_ACCOUNT,
};

const STEP_CONFIRM_WITHDRAW = {
  name: 'STEP_CONFIRM_WITHDRAW',
  next: null,
  prev: null,
};

const STEP_FINISH = {
  name: 'STEP_FINISH',
  next: null,
  prev: null,
};

const STEP_CLIENT_SERVICE = {
  name: 'STEP_CLIENT_SERVICE',
  next: null,
  prev: null,
};

/*eslint-disable */
STEP_SELECT_ACCOUNT.next = (isCacheInsufficient, isWithdrawFromRetirement) => (
  isCacheInsufficient       ? STEP_CONFIRM_CACHE_INSUFFICIENT :
  isWithdrawFromRetirement  ? STEP_CONFIRM_WITHDRAW_FROM_RETIREMENT
                            : STEP_CONFIRM_WITHDRAW
);

STEP_CONFIRM_CACHE_INSUFFICIENT.next = STEP_CONFIRM_WITHDRAW;

STEP_CONFIRM_WITHDRAW.prev = (isCacheInsufficient, isWithdrawFromRetirement) => (
  isCacheInsufficient       ? STEP_CONFIRM_CACHE_INSUFFICIENT :
  isWithdrawFromRetirement  ? STEP_CONFIRM_WITHDRAW_FROM_RETIREMENT
                            : STEP_SELECT_ACCOUNT
);
STEP_CONFIRM_WITHDRAW.next = STEP_FINISH;

STEP_CONFIRM_WITHDRAW_FROM_RETIREMENT.next = STEP_CLIENT_SERVICE;
/*eslint-enable */

const STEPS = {
  STEP_SELECT_ACCOUNT,
  STEP_CONFIRM_CACHE_INSUFFICIENT,
  STEP_CONFIRM_WITHDRAW_FROM_RETIREMENT,
  STEP_CONFIRM_WITHDRAW,
  STEP_FINISH,
  STEP_CLIENT_SERVICE,
};

const stepsWay = new WizardWay(STEPS, STEP_SELECT_ACCOUNT);

class FundingWithdrawForm extends Component {
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

    stepsWay.setCurrent(STEP_SELECT_ACCOUNT);

    return dispatch(reset(FORM_NAME));
  }

  checkIsCacheInsufficient() {
    const { amount, account } = this.props;

    return account === 'investment' && amount > 100;
  }

  checkIsWithdrawFromRetirement() {
    const { account } = this.props;

    return account === 'retirement';
  }

  handleNextPage(event) {
    if (event) event.preventDefault();

    const isCacheInsufficient = this.checkIsCacheInsufficient();
    const isWithdrawFromRetirement = this.checkIsWithdrawFromRetirement();

    this.setState({
      step: stepsWay.getNext(isCacheInsufficient, isWithdrawFromRetirement).name,
    });
  }

  handlePrevPage(event) {
    event.preventDefault();

    const isCacheInsufficient = this.checkIsCacheInsufficient();
    const isWithdrawFromRetirement = this.checkIsWithdrawFromRetirement();

    this.setState({
      step: stepsWay.getPrev(isCacheInsufficient, isWithdrawFromRetirement).name,
    });
  }

  handleClickFinish(event) {
    event.preventDefault();

    const { dispatch } = this.props;

    stepsWay.setCurrent(STEP_SELECT_ACCOUNT);

    dispatch(reset(FORM_NAME));

    this.setState({
      step: stepsWay.getCurrent().name,
    });
  }

  handleClickSubmit({ amount, account }) {
    const { dispatch } = this.props;

    return dispatch(withdraw({ amount, account }))
      .then(() => this.handleNextPage());
  }

  render() {
    const { step } = this.state;
    const { amount, account } = this.props;

    return matchStrict(step, {
      STEP_SELECT_ACCOUNT: <StepSelectAccount onSubmit={this.handleNextPage} />,
      STEP_CONFIRM_CACHE_INSUFFICIENT: (
        <StepConfirmCacheInsufficient
          amount={amount}
          account={account}
          onSubmit={this.handleNextPage}
          onClickPrevPage={this.handlePrevPage}
        />
      ),
      STEP_CONFIRM_WITHDRAW_FROM_RETIREMENT: (
        <StepConfirmWithdrawFromRetirement
          onSubmit={this.handleNextPage}
          onClickPrevPage={this.handlePrevPage}
        />
      ),
      STEP_CONFIRM_WITHDRAW: (
        <StepConfirmWithdraw
          amount={amount}
          account={account}
          onSubmit={this.handleClickSubmit}
          onClickPrevPage={this.handlePrevPage}
        />
      ),
      STEP_FINISH: (
        <StepFinish
          amount={amount}
          account={account}
          onClickFinish={this.handleClickFinish}
        />
      ),
      STEP_CLIENT_SERVICE: <StepClientService onClickFinish={this.handleClickFinish} />,
    }, null);
  }
}

FundingWithdrawForm.displayName = 'FundingWithdrawForm';

FundingWithdrawForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  amount: PropTypes.number,
  account: PropTypes.oneOf(['savings', 'investment', 'retirement']),
};

FundingWithdrawForm.defaultProps = {
  amount: undefined,
  account: undefined,
};

const selector = formValueSelector(FORM_NAME);

export default connect(state => ({
  // numeral because we get data from input field using selector,
  // not onChange event with formatted value
  amount: numeral(selector(state, 'amount')).value(),
  account: selector(state, 'account'),
}))(FundingWithdrawForm);
