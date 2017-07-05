import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reset, formValueSelector } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';

import numeral from 'numeral';

import { transfer } from '../../actions/funding';

import {
  StepClientService,
  StepSelectAccount,
  StepConfirmCacheInsufficient,
  StepConfirmTransferFromRetirement,
  StepConfirmTransfer,
  StepFinish,
} from './Steps';

import WizardWay from '../../utils/wizardWay';
import { matchStrict } from '../../utils/match';

const FORM_NAME = 'funding-transfer-form';

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

const STEP_CONFIRM_TRANSFER_FROM_RETIREMENT = {
  name: 'STEP_CONFIRM_TRANSFER_FROM_RETIREMENT',
  next: null,
  prev: STEP_SELECT_ACCOUNT,
};

const STEP_CONFIRM_TRANSFER = {
  name: 'STEP_CONFIRM_TRANSFER',
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
STEP_SELECT_ACCOUNT.next = (isCacheInsufficient, isTransferFromRetirement) => (
  isCacheInsufficient       ? STEP_CONFIRM_CACHE_INSUFFICIENT :
  isTransferFromRetirement  ? STEP_CONFIRM_TRANSFER_FROM_RETIREMENT
                            : STEP_CONFIRM_TRANSFER
);

STEP_CONFIRM_CACHE_INSUFFICIENT.next = STEP_CONFIRM_TRANSFER;

STEP_CONFIRM_TRANSFER.prev = (isCacheInsufficient, isTransferFromRetirement) => (
  isCacheInsufficient       ? STEP_CONFIRM_CACHE_INSUFFICIENT :
  isTransferFromRetirement  ? STEP_CONFIRM_TRANSFER_FROM_RETIREMENT
                            : STEP_SELECT_ACCOUNT
);
STEP_CONFIRM_TRANSFER.next = STEP_FINISH;

STEP_CONFIRM_TRANSFER_FROM_RETIREMENT.next = STEP_CLIENT_SERVICE;
/*eslint-enable */

const STEPS = {
  STEP_SELECT_ACCOUNT,
  STEP_CONFIRM_CACHE_INSUFFICIENT,
  STEP_CONFIRM_TRANSFER_FROM_RETIREMENT,
  STEP_CONFIRM_TRANSFER,
  STEP_FINISH,
  STEP_CLIENT_SERVICE,
};

const stepsWay = new WizardWay(STEPS, STEP_SELECT_ACCOUNT);

class FundingTransferForm extends Component {
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
    const { amount, from } = this.props;

    return from === 'investment' && amount > 100;
  }

  checkIsTransferFromRetirement() {
    const { from } = this.props;

    return from === 'retirement';
  }

  handleNextPage(event) {
    if (event) event.preventDefault();

    const isCacheInsufficient = this.checkIsCacheInsufficient();
    const isTransferFromRetirement = this.checkIsTransferFromRetirement();

    this.setState({
      step: stepsWay.getNext(isCacheInsufficient, isTransferFromRetirement).name,
    });
  }

  handlePrevPage(event) {
    event.preventDefault();

    const isCacheInsufficient = this.checkIsCacheInsufficient();
    const isTransferFromRetirement = this.checkIsTransferFromRetirement();

    this.setState({
      step: stepsWay.getPrev(isCacheInsufficient, isTransferFromRetirement).name,
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

  handleClickSubmit({ amount, from, to }) {
    const { dispatch } = this.props;

    return dispatch(transfer({ amount, from, to }))
      .then(() => this.handleNextPage());
  }

  render() {
    const { step } = this.state;
    const { amount, from, to } = this.props;

    return matchStrict(step, {
      STEP_SELECT_ACCOUNT: <StepSelectAccount onSubmit={this.handleNextPage} />,
      STEP_CONFIRM_CACHE_INSUFFICIENT: (
        <StepConfirmCacheInsufficient
          onSubmit={this.handleNextPage}
          onClickPrevPage={this.handlePrevPage}
          amount={amount}
          from={from}
          to={to}
        />
      ),
      STEP_CONFIRM_TRANSFER_FROM_RETIREMENT: (
        <StepConfirmTransferFromRetirement
          onSubmit={this.handleNextPage}
          onClickPrevPage={this.handlePrevPage}
        />
      ),
      STEP_CONFIRM_TRANSFER: (
        <StepConfirmTransfer
          onSubmit={this.handleClickSubmit}
          onClickPrevPage={this.handlePrevPage}
          amount={amount}
          from={from}
          to={to}
        />
      ),
      STEP_FINISH: (
        <StepFinish
          onClickFinish={this.handleClickFinish}
          amount={amount}
          from={from}
          to={to}
        />
      ),
      STEP_CLIENT_SERVICE: <StepClientService onClickFinish={this.handleClickFinish} />,
    }, null);
  }
}

FundingTransferForm.displayName = 'FundingTransferForm';

FundingTransferForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  amount: PropTypes.number,
  from: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  to: PropTypes.oneOf(['savings', 'investment', 'retirement']),
};

FundingTransferForm.defaultProps = {
  amount: undefined,
  from: undefined,
  to: undefined,
};

const selector = formValueSelector(FORM_NAME);

export default connect(state => ({
  // numeral because we get data from input field using selector,
  // not onChange event with formatted value
  amount: numeral(selector(state, 'amount')).value(),
  from: selector(state, 'from'),
  to: selector(state, 'to'),
}))(FundingTransferForm);
