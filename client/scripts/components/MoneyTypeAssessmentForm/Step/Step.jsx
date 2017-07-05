import React, { PropTypes } from 'react';
import { reduxForm, propTypes as ReduxFormPropTypes } from 'redux-form';

import classNames from 'classnames/bind';

import { Button } from '../../UI';
import Question from '../Question/Question';

import validate from '../validate';

import styles from './Step.css';

const cx = classNames.bind(styles);

const Step = ({
  onSubmit,
  handleSubmit,
  submitting,
  valid,
  questions,
  answers,
  isLast,
  step,
  onChangeAnswer,
}) => {
  const len = questions.length;

  const renderedQuestions = questions.map((question, idx) => {
    const number = idx + (step - 1) * len + 1;
    const isLastQuestion = idx === len - 1;

    return (
      <Question
        number={number}
        question={question}
        answers={answers}
        key={question.id}
        isLast={isLastQuestion}
        onChangeAnswer={onChangeAnswer}
      />
    );
  });

  const Tag = isLast ? 'form' : 'div';

  return (
    <Tag className={cx('Step')} onSubmit={isLast ? handleSubmit(onSubmit) : Function.prototype}>
      {renderedQuestions}
      <div className={cx('Row')}>
        <Button
          label={isLast ? 'Get your results' : 'Next'}
          icon="arrow-right"
          iconAlign="right"
          isLoading={submitting}
          isDisabled={submitting || !valid}
          onClick={onSubmit}
          className={cx('Button')}
        />
      </div>
    </Tag>
  );
};

Step.displayName = 'Step';

Step.propTypes = {
  ...ReduxFormPropTypes,
  questions: PropTypes.arrayOf(PropTypes.object),
  answers: PropTypes.arrayOf(PropTypes.object),
  isLast: PropTypes.bool,
  step: PropTypes.number,
  onChangeAnswer: PropTypes.func,
};

Step.defaultProps = {
  questions: [],
  answers: [],
  isLast: false,
  step: 1,
  onChangeAnswer: Function.prototype,
};

export default reduxForm({
  form: 'moneytype-assessment-form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(Step);
