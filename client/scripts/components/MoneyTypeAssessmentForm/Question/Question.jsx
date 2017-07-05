import React, { PropTypes } from 'react';
import { Field as ReduxFormField } from 'redux-form';

import classNames from 'classnames/bind';

import { Section, RadioGroup, Radio } from '../../UI';

import styles from './Question.css';

const cx = classNames.bind(styles);

const renderRadioGroupField = ({ input, children, onChangeEnhancer }) => (
  <RadioGroup
    {...input}
    onChange={(value) => {
      onChangeEnhancer(value);
      input.onChange(value);
    }}
  >
    {children}
  </RadioGroup>
);

const Question = ({ number, question, answers, isLast, onChangeAnswer }) => {
  let questionRef;

  const renderedAnswers = answers.map(({ value, label }) => (
    <Radio
      label={label}
      className={cx('Radio')}
      key={`${number}-answer-${value}`}
      value={value}
    />
  ));

  const sectionProps = isLast ? {} : {
    border: 'bottom',
    borderColor: 'grey',
    borderWidth: 'basic',
  };

  const handleChangeAnswer = (value) => {
    if (onChangeAnswer) onChangeAnswer(question.id, value, questionRef);
  };

  return (
    <Section
      sectionClassName={cx('Question')}
      {...sectionProps}
    >
      <div
        className={cx('QuestionText')}
        ref={(elem) => { questionRef = elem; }}
      >
        {`${number}. ${question.text}`}
      </div>
      <ReduxFormField
        component={renderRadioGroupField}
        name={`${question.id}`}
        onChangeEnhancer={handleChangeAnswer}
      >
        {renderedAnswers}
      </ReduxFormField>
    </Section>
  );
};

Question.displayName = 'Question';

Question.propTypes = {
  number: PropTypes.number,
  question: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.number,
    answer: PropTypes.string,
  }),
  answers: PropTypes.arrayOf(PropTypes.object),
  isLast: PropTypes.bool,
  onChangeAnswer: PropTypes.func,
};

Question.defaultProps = {
  number: undefined,
  question: undefined,
  answers: undefined,
  isLast: false,
  onChangeAnswer: Function.prototype,
};

export default Question;
