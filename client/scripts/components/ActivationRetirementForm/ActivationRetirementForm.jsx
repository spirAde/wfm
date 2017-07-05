import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reset, autofill, formValueSelector } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';

import numeral from 'numeral';
import invariant from 'invariant';

import WizardWay from '../../utils/wizardWay';
import { matchStrict } from '../../utils/match';

import { deposit } from '../../actions/funding';

import {
  StepSelectYear,
  StepSelectPrevAmount,
  StepSelectAmount,
  StepConfirmFunding,
  StepFinish,
} from './Steps';

import FAQ from './FAQ/FAQ';

const FORM_NAME = 'activation-retirement-form';

const STEP_SELECT_YEAR = {
  name: 'STEP_SELECT_YEAR',
  next: null,
  prev: null,
};

const STEP_SELECT_PREV_AMOUNT = {
  name: 'STEP_SELECT_PREV_AMOUNT',
  next: null,
  prev: STEP_SELECT_YEAR,
};

const STEP_SELECT_AMOUNT = {
  name: 'STEP_SELECT_AMOUNT',
  next: null,
  prev: STEP_SELECT_PREV_AMOUNT,
};

const STEP_CONFIRM_FUNDING = {
  name: 'STEP_CONFIRM_FUNDING',
  next: null,
  prev: STEP_SELECT_AMOUNT,
};

const STEP_FINISH = {
  name: 'STEP_FINISH',
  next: null,
  prev: null,
};

STEP_SELECT_YEAR.next = STEP_SELECT_PREV_AMOUNT;
STEP_SELECT_PREV_AMOUNT.next = STEP_SELECT_AMOUNT;
STEP_SELECT_AMOUNT.next = STEP_CONFIRM_FUNDING;
STEP_CONFIRM_FUNDING.next = STEP_FINISH;

const STEPS = {
  STEP_SELECT_YEAR,
  STEP_SELECT_PREV_AMOUNT,
  STEP_SELECT_AMOUNT,
  STEP_CONFIRM_FUNDING,
  STEP_FINISH,
};

const stepsWay = new WizardWay(STEPS, STEP_SELECT_YEAR);

class ActivationRetirementForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      FAQIsOpen: false,
      step: stepsWay.getCurrent().name,
    };

    this.handleSelectYear = this.handleSelectYear.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleClickFinish = this.handleClickFinish.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickFAQ = this.handleClickFAQ.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    stepsWay.setCurrent(STEP_SELECT_YEAR);

    return dispatch(reset(FORM_NAME));
  }

  handleSelectYear(year) {
    const { dispatch } = this.props;

    dispatch(autofill(FORM_NAME, 'year', year));

    this.setState({
      FAQIsOpen: false,
      step: stepsWay.getNext().name,
    });
  }

  handleNextPage(event) {
    if (event) event.preventDefault();

    this.setState({
      FAQIsOpen: false,
      step: stepsWay.getNext().name,
    });
  }

  handlePrevPage(event) {
    event.preventDefault();

    this.setState({
      FAQIsOpen: false,
      step: stepsWay.getPrev().name,
    });
  }

  handleClickFinish(event) {
    event.preventDefault();

    const { dispatch, onClickFinish } = this.props;

    stepsWay.setCurrent(STEP_SELECT_YEAR);

    dispatch(reset(FORM_NAME));

    invariant(
      !!onClickFinish,
      'ActivateRetirementForm has not onClickFinish handler for closing form',
    );
  }

  handleClickSubmit({ year, amount }) {
    const { dispatch } = this.props;

    return dispatch(deposit({ year, amount }))
      .then(() => this.handleNextPage());
  }

  handleClickFAQ(event) {
    event.preventDefault();

    const { FAQIsOpen } = this.state;

    this.setState({
      FAQIsOpen: !FAQIsOpen,
    });
  }

  render() {
    const { step, FAQIsOpen } = this.state;
    const { limit = 6500, year, prevAmount, amount } = this.props;

    const renderedStep = matchStrict(step, {
      STEP_SELECT_YEAR: (
        <StepSelectYear
          onSelectYear={this.handleSelectYear}
          onClickFAQ={this.handleClickFAQ}
        />
      ),
      STEP_SELECT_PREV_AMOUNT: (
        <StepSelectPrevAmount
          limit={limit}
          year={year}
          onC
          onClickFAQ={this.handleClickFAQ}
          onSubmit={this.handleNextPage}
        />
      ),
      STEP_SELECT_AMOUNT: (
        <StepSelectAmount
          limit={limit}
          year={year}
          prevAmount={prevAmount}
          onSubmit={this.handleNextPage}
        />
      ),
      STEP_CONFIRM_FUNDING: (
        <StepConfirmFunding
          amount={amount}
          onSubmit={this.handleClickSubmit}
        />
      ),
      STEP_FINISH: <StepFinish onClickFinish={this.handleClickFinish} />,
    }, null);

    return (
      <div>
        {renderedStep}
        {FAQIsOpen && <FAQ />}
      </div>
    );
  }
}

ActivationRetirementForm.displayName = 'ActivationRetirementForm';

ActivationRetirementForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  limit: PropTypes.oneOf([5500, 6500]),
  year: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  prevAmount: PropTypes.number,
  amount: PropTypes.number,
  onClickFinish: PropTypes.func,
};

ActivationRetirementForm.defaultProps = {
  limit: undefined,
  year: undefined,
  prevAmount: undefined,
  amount: undefined,
  onClickFinish: undefined,
};

const selector = formValueSelector(FORM_NAME);

export default connect(state => ({
  year: selector(state, 'year'),
  prevAmount: numeral(selector(state, 'prevAmount')).value(),
  amount: numeral(selector(state, 'amount')).value(),
}))(ActivationRetirementForm);
