import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reset, formValueSelector } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';

import find from 'lodash/find';

import moment from 'moment';
import numeral from 'numeral';

import WizardWay from '../../utils/wizardWay';
import { matchStrict } from '../../utils/match';

import {
  updateRecurringTransaction,
  cancelRecurringTransaction,
} from '../../actions/recurring';

import {
  StepEditingItem,
  StepFinishEditing,
  StepCancellingItem,
  StepFinishCancelling,
} from './Steps';

const FORM_NAME = 'recurring-editing-item-form';

const STEP_CANCELLING_ITEM = {
  name: 'STEP_CANCELLING_ITEM',
  next: null,
  prev: null,
};

const STEP_EDITING_ITEM = {
  name: 'STEP_EDITING_ITEM',
  next: null,
  prev: null,
};

const STEP_FINISH_CANCELLING = {
  name: 'STEP_FINISH_CANCELLING',
  next: null,
  prev: null,
};

const STEP_FINISH_EDITING = {
  name: 'STEP_FINISH_EDITING',
  next: null,
  prev: null,
};

/*eslint-disable */
STEP_EDITING_ITEM.next = isCancelled => isCancelled ? STEP_CANCELLING_ITEM : STEP_FINISH_EDITING;
STEP_CANCELLING_ITEM.next = STEP_FINISH_CANCELLING;
STEP_CANCELLING_ITEM.prev = STEP_EDITING_ITEM;
/*eslint-enable */

const STEPS = {
  STEP_CANCELLING_ITEM,
  STEP_EDITING_ITEM,
  STEP_FINISH_CANCELLING,
  STEP_FINISH_EDITING,
};

const stepsWay = new WizardWay(STEPS, STEP_EDITING_ITEM);

const accounts = [
  { type: 'savings', number: '1638', account: '901132360' },
  { type: 'investment', number: '1639', account: '901336860' },
  { type: 'retirement', number: '1640', account: '901504160' },
];

class RecurringEditingItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: stepsWay.getCurrent().name,
      isCancelled: false,
    };

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);

    this.handleClickSubmitUpdate = this.handleClickSubmitUpdate.bind(this);
    this.handleClickSubmitCancel = this.handleClickSubmitCancel.bind(this);

    this.handleClickFinish = this.handleClickFinish.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    stepsWay.setCurrent(STEP_EDITING_ITEM);

    return dispatch(reset(FORM_NAME));
  }

  handleNextPage(event) {
    if (event) event.preventDefault();

    const { isCancelled } = this.state;

    this.setState({
      step: stepsWay.getNext(isCancelled).name,
    });
  }

  handlePrevPage(event) {
    event.preventDefault();

    this.setState({
      isCancelled: false,
      step: stepsWay.getPrev().name,
    });
  }

  handleClickFinish(event) {
    if (event) event.preventDefault();

    const { dispatch, onHide } = this.props;

    stepsWay.setCurrent(STEP_EDITING_ITEM);

    dispatch(reset(FORM_NAME));

    this.setState({
      step: stepsWay.getCurrent().name,
    });

    if (onHide) onHide();
  }

  handleClickSubmitUpdate() {
    const { dispatch } = this.props;

    return dispatch(updateRecurringTransaction())
      .then(() => this.handleNextPage());
  }

  handleClickSubmitCancel() {
    const { dispatch } = this.props;

    return dispatch(cancelRecurringTransaction())
      .then(() => this.handleNextPage());
  }

  handleClickCancel(event) {
    event.preventDefault();

    this.setState({
      isCancelled: true,
    }, () => this.handleNextPage());
  }

  render() {
    const { step } = this.state;

    const { transaction, transaction: { account_id: accountId }, amount, date } = this.props;

    const initialValues = {
      amount: transaction.amount,
      date: transaction.date,
    };

    const account = find(accounts, accountItem => accountItem.number === accountId) || {};
    const accountType = account.type;

    return matchStrict(step, {
      STEP_EDITING_ITEM: (
        <StepEditingItem
          initialValues={initialValues}
          accountType={accountType}
          bank="BANK OF AMERICA, N.A. (3905)" // TODO: change static
          onClickFinish={this.handleClickFinish}
          onSubmit={this.handleClickSubmitUpdate}
          onClickCancel={this.handleClickCancel}
        />
      ),
      STEP_FINISH_EDITING: (
        <StepFinishEditing
          onClickFinish={this.handleClickFinish}
        />
      ),
      STEP_CANCELLING_ITEM: (
        <StepCancellingItem
          amount={amount}
          date={date}
          onSubmit={this.handleClickSubmitCancel}
          onClickPrevPage={this.handlePrevPage}
        />
      ),
      STEP_FINISH_CANCELLING: (
        <StepFinishCancelling
          onClickFinish={this.handleClickFinish}
        />
      ),
    }, null);
  }
}

RecurringEditingItemForm.displayName = 'RecurringEditingItemForm';

RecurringEditingItemForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  transaction: PropTypes.object,
  amount: PropTypes.number,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  onHide: PropTypes.func,
};

RecurringEditingItemForm.defaultProps = {
  transaction: {},
  amount: undefined,
  date: undefined,
  onHide: Function.prototype,
};

const selector = formValueSelector(FORM_NAME);

export default connect(state => ({
  amount: numeral(selector(state, 'amount')).value(),
  date: moment(selector(state, 'date')),
}))(RecurringEditingItemForm);
