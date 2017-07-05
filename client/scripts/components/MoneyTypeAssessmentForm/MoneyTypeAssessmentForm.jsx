import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import findIndex from 'lodash/findIndex';
import some from 'lodash/some';
import chunk from 'lodash/chunk';
import map from 'lodash/map';
import isNull from 'lodash/isNull';

import { finishAssessment } from '../../actions/moneytype';

import { moneyTypeAnswers } from '../../utils/options';
import scrollTo from '../../utils/scrollTo';

import styles from './MoneyTypeAssessmentForm.css';

import Step from './Step/Step';

const cx = classNames.bind(styles);

const FORM_NAME = 'moneytype-assessment-form';
const PAGE_QUESTIONS_COUNT = 10;

class MoneyTypeAssessmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: this.findAssessmentPage(),
    };

    this.handleChangeAnswer = this.handleChangeAnswer.bind(this);

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    return dispatch(reset(FORM_NAME));
  }

  handleChangeAnswer(questionId, answer, questionRef) {
    if (questionRef) {
      const nextSectionElem = questionRef.parentNode.nextSibling;
      scrollTo(nextSectionElem, 500, 'linear', 70, 'center');
    }

    console.log(questionId, answer);
  }

  handleNextPage(event) {
    if (event) event.preventDefault();

    const { step } = this.state;

    this.setState({
      step: step + 1,
    }, () => scrollTo(document.body, 1000));
  }

  handlePrevPage(event) {
    if (event) event.preventDefault();

    const { step } = this.state;

    this.setState({
      step: step - 1,
    });
  }

  handleClickSubmit() {
    const { dispatch, onClickFinishAssessment } = this.props;

    return dispatch(finishAssessment()).then(() => {
      onClickFinishAssessment();
    });
  }

  findAssessmentPage() {
    const { questions } = this.props;

    const chunks = chunk(questions, PAGE_QUESTIONS_COUNT);

    const page = findIndex(chunks, (questionsChunk) => {
      const answers = map(questionsChunk, 'answer');
      return some(answers, answer => isNull(answer));
    });

    return page !== -1 ? page + 1 : chunks.length;
  }

  render() {
    const { questions } = this.props;
    const { step } = this.state;

    const isFirstPage = step === 1;
    const limit = questions.length / PAGE_QUESTIONS_COUNT;
    const questionsChunks = chunk(questions, PAGE_QUESTIONS_COUNT);
    const currentQuestionsChunk = questionsChunks[step - 1];
    const isLast = step === limit;

    return (
      <div className={cx('MoneyTypeAssessmentForm')}>
        <Step
          questions={currentQuestionsChunk}
          answers={moneyTypeAnswers}
          isLast={isLast}
          step={step}
          onChangeAnswer={this.handleChangeAnswer}
          onSubmit={isLast ? this.handleClickSubmit : this.handleNextPage}
        />
      </div>
    );
  }
}

MoneyTypeAssessmentForm.displayName = 'MoneyTypeAssessmentForm';

MoneyTypeAssessmentForm.propTypes = {
  dispatch: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.object),
  onClickFinishAssessment: PropTypes.func,
};

MoneyTypeAssessmentForm.defaultProps = {
  dispatch: Function.prototype,
  questions: [],
  onClickFinishAssessment: Function.prototype,
};

export default connect()(MoneyTypeAssessmentForm);
