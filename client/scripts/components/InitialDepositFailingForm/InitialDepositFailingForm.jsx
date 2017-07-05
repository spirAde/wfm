import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import shallowCompare from 'react-addons-shallow-compare';

import { deposit } from '../../actions/funding';

import {
  StepReselect,
  StepFinish,
} from './Steps';

import WizardWay from '../../utils/wizardWay';
import { matchStrict } from '../../utils/match';

const FORM_NAME = 'initial-deposit-failing-form';

const STEP_RESELECT = {
  name: 'STEP_RESELECT',
  next: null,
  prev: null,
};

const STEP_FINISH = {
  name: 'STEP_FINISH',
  next: null,
  prev: null,
};

STEP_RESELECT.next = STEP_FINISH;

const STEPS = {
  STEP_RESELECT,
  STEP_FINISH,
};

const stepsWay = new WizardWay(STEPS, STEP_RESELECT);

class InitialDepositFailingForm extends Component {
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

    stepsWay.setCurrent(STEP_RESELECT);

    return dispatch(reset(FORM_NAME));
  }

  handleNextPage(event) {
    if (event) event.preventDefault();

    this.setState({
      step: stepsWay.getNext().name,
    });
  }

  handlePrevPage(event) {
    event.preventDefault();

    this.setState({
      step: stepsWay.getPrev().name,
    });
  }

  handleClickFinish(event) {
    event.preventDefault();

    const { dispatch } = this.props;

    stepsWay.setCurrent(STEP_RESELECT);

    dispatch(reset(FORM_NAME));

    this.setState({
      step: stepsWay.getCurrent().name,
    });
  }

  handleClickSubmit({ amount, from, to }) {
    const { dispatch } = this.props;

    return dispatch(deposit({ amount, from, to }))
      .then(() => this.handleNextPage());
  }

  render() {
    const { step } = this.state;
    const { initialDeposit, balance } = this.props;

    return matchStrict(step, {
      STEP_RESELECT: (
        <StepReselect
          initialDeposit={initialDeposit}
          balance={balance}
          onSubmit={this.handleClickSubmit}
        />
      ),
      STEP_FINISH: (
        <StepFinish onClickFinish={this.handleClickFinish} />
      ),
    }, null);
  }
}

InitialDepositFailingForm.displayName = 'InitialDepositFailingForm';

InitialDepositFailingForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialDeposit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  balance: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

InitialDepositFailingForm.defaultProps = {
  initialDeposit: 0,
  balance: 0,
};

export default connect()(InitialDepositFailingForm);
