import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reset, formValueSelector } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';

import numeral from 'numeral';
import find from 'lodash/find';

import {
  updateRecurringTransactionGroup,
  cancelRecurringTransactionGroup,
} from '../../actions/recurring';

import { getClosestRecurringDate, getPeriodicityText } from '../../utils/helpers/recurring';

import { dayOptions } from '../../utils/options';

import {
  StepEditingGroup,
  StepFinishEditing,
  StepCancellingGroup,
  StepFinishCancelling,
} from './Steps';

import WizardWay from '../../utils/wizardWay';
import { matchStrict } from '../../utils/match';

const FORM_NAME = 'recurring-editing-group-form';

const STEP_CANCELLING_GROUP = {
  name: 'STEP_CANCELLING_GROUP',
  next: null,
  prev: null,
};

const STEP_EDITING_GROUP = {
  name: 'STEP_EDITING_GROUP',
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
STEP_EDITING_GROUP.next = isCancelled => isCancelled ? STEP_CANCELLING_GROUP : STEP_FINISH_EDITING;
STEP_CANCELLING_GROUP.next = STEP_FINISH_CANCELLING;
STEP_CANCELLING_GROUP.prev = STEP_EDITING_GROUP;
/*eslint-enable */

const STEPS = {
  STEP_CANCELLING_GROUP,
  STEP_EDITING_GROUP,
  STEP_FINISH_CANCELLING,
  STEP_FINISH_EDITING,
};

const stepsWay = new WizardWay(STEPS, STEP_EDITING_GROUP);

const accounts = [
  { type: 'savings', number: '1638', account: '901132360' },
  { type: 'investment', number: '1639', account: '901336860' },
  { type: 'retirement', number: '1640', account: '901504160' },
];

class RecurringEditingGroupForm extends Component {
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

    stepsWay.setCurrent(STEP_EDITING_GROUP);

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

    stepsWay.setCurrent(STEP_EDITING_GROUP);

    dispatch(reset(FORM_NAME));

    this.setState({
      step: stepsWay.getCurrent().name,
    });

    if (onHide) onHide();
  }

  handleClickSubmitUpdate() {
    const { dispatch, group } = this.props;

    return dispatch(updateRecurringTransactionGroup(group.id))
      .then(() => this.handleNextPage());
  }

  handleClickSubmitCancel() {
    const { dispatch, group } = this.props;

    return dispatch(cancelRecurringTransactionGroup(group.id))
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

    const { group, amount, periodicity, day, account } = this.props;

    const initialValues = {
      amount: group.amount,
      periodicity: group.period,
      day: find(dayOptions[group.period], option => option.label === group.day).value,
      account: find(accounts, accountItem => accountItem.number === group.account_id).type,
    };

    return matchStrict(step, {
      STEP_EDITING_GROUP: (
        <StepEditingGroup
          initialValues={initialValues}
          periodicity={periodicity}
          onClickFinish={this.handleClickFinish}
          onSubmit={this.handleClickSubmitUpdate}
          onClickCancel={this.handleClickCancel}
        />
      ),
      STEP_FINISH_EDITING: (
        <StepFinishEditing
          amount={amount}
          periodicityText={getPeriodicityText(periodicity, day)}
          closestRecurringDate={getClosestRecurringDate(periodicity, day)}
          account={account}
          onClickFinish={this.handleClickFinish}
        />
      ),
      STEP_CANCELLING_GROUP: (
        <StepCancellingGroup
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

RecurringEditingGroupForm.displayName = 'RecurringEditingGroupForm';

RecurringEditingGroupForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  group: PropTypes.object,
  amount: PropTypes.number,
  periodicity: PropTypes.oneOf(['weekly', 'biweekly', 'monthly']),
  day: PropTypes.oneOf(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'start', 'middle', 'end']),
  account: PropTypes.oneOf(['savings', 'investment', 'retirement', undefined]),
  onHide: PropTypes.func,
};

RecurringEditingGroupForm.defaultProps = {
  group: undefined,
  amount: undefined,
  periodicity: undefined,
  day: undefined,
  account: undefined,
  onHide: Function.prototype,
};

const selector = formValueSelector(FORM_NAME);

export default connect(state => ({
  amount: numeral(selector(state, 'amount')).value(),
  periodicity: selector(state, 'periodicity'),
  day: selector(state, 'day'),
  account: selector(state, 'account'),
}))(RecurringEditingGroupForm);
