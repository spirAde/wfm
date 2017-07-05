import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reset, formValueSelector } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';

import numeral from 'numeral';

import { createRecurringTransactionGroup } from '../../actions/recurring';

import { getClosestRecurringDate, getPeriodicityText } from '../../utils/helpers/recurring';

import {
  StepCreatingGroup,
  StepFinish,
} from './Steps';

import WizardWay from '../../utils/wizardWay';
import { matchStrict } from '../../utils/match';

const FORM_NAME = 'recurring-creating-group-form';

const STEP_CREATING_GROUP = {
  name: 'STEP_CREATING_GROUP',
  next: null,
  prev: null,
};

const STEP_FINISH = {
  name: 'STEP_FINISH',
  next: null,
  prev: STEP_CREATING_GROUP,
};

STEP_CREATING_GROUP.next = STEP_FINISH;

const STEPS = {
  STEP_CREATING_GROUP,
  STEP_FINISH,
};

const stepsWay = new WizardWay(STEPS, STEP_CREATING_GROUP);

class RecurringCreatingGroupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: stepsWay.getCurrent().name,
    };

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleClickFinish = this.handleClickFinish.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    stepsWay.setCurrent(STEP_CREATING_GROUP);

    return dispatch(reset(FORM_NAME));
  }

  handleNextPage(event) {
    if (event) event.preventDefault();

    this.setState({
      step: stepsWay.getNext().name,
    });
  }

  handleClickFinish(event) {
    event.preventDefault();

    const { dispatch, onHide } = this.props;

    stepsWay.setCurrent(STEP_CREATING_GROUP);

    dispatch(reset(FORM_NAME));

    this.setState({
      step: stepsWay.getCurrent().name,
    });

    if (onHide) onHide();
  }

  handleClickSubmit() {
    const { dispatch } = this.props;

    return dispatch(createRecurringTransactionGroup())
      .then(() => this.handleNextPage());
  }

  render() {
    const { step } = this.state;

    const { amount, periodicity, day, account } = this.props;

    return matchStrict(step, {
      STEP_CREATING_GROUP: (
        <StepCreatingGroup
          periodicity={periodicity}
          onClickFinish={this.handleClickFinish}
          onSubmit={this.handleClickSubmit}
        />
      ),
      STEP_FINISH: (
        <StepFinish
          amount={amount}
          periodicityText={getPeriodicityText(periodicity, day)}
          closestRecurringDate={getClosestRecurringDate(periodicity, day)}
          account={account}
          onClickFinish={this.handleClickFinish}
        />
      ),
    }, null);
  }
}

RecurringCreatingGroupForm.displayName = 'RecurringCreatingGroupForm';

RecurringCreatingGroupForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  amount: PropTypes.number,
  periodicity: PropTypes.oneOf(['weekly', 'biweekly', 'monthly']),
  day: PropTypes.oneOf(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'start', 'middle', 'end']),
  account: PropTypes.oneOf(['savings', 'investment', 'retirement', undefined]),
  onHide: PropTypes.func,
};

RecurringCreatingGroupForm.defaultProps = {
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
}))(RecurringCreatingGroupForm);
