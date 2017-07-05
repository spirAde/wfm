import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './OnboardingNavigation.css';

const cx = classNames.bind(styles);

const OnboardingNavigation = ({ availableStep, currentStep, navigation, onClick }) => {
  const [availableGroupIndex, availableStepIndex] = availableStep;
  const [currentGroupIndex, currentStepIndex] = currentStep;

  const renderSteps = groupIndex => (
    navigation[groupIndex].steps.map((step, index) => {
      const stepIsCurrent = groupIndex === currentGroupIndex && currentStepIndex === index;

      const stepIsActive = (groupIndex < availableGroupIndex)
        || (groupIndex === availableGroupIndex && index <= availableStepIndex);

      const stepClasses = cx('Step', {
        Active: stepIsActive,
        Current: stepIsCurrent,
      });

      return (
        <a
          key={`survey-step-${index}`}
          onClick={
            stepIsActive
            ? event => onClick(event, [groupIndex, index], step)
            : Function.prototype
          }
        >
          <span className={stepClasses} />
        </a>
      );
    })
  );

  const renderGroups = () => (
    navigation.map((group, index) => {
      const steps = renderSteps(index);

      const groupIsActive = index <= availableGroupIndex;

      const groupClasses = cx('Group', {
        Active: groupIsActive,
      });

      const text = navigation[index].text;

      return (
        <div className={groupClasses} key={`survey-group-${index}`}>
          <div className={cx('GroupName')}>
            {text}
          </div>
          <div className={cx('Steps')}>
            {steps}
          </div>
        </div>
      );
    })
  );

  const renderedGroups = renderGroups();

  return (
    <div className={cx('OnboardingNavigation')}>
      {renderedGroups}
    </div>
  );
};

OnboardingNavigation.displayName = 'OnboardingNavigation';

OnboardingNavigation.propTypes = {
  availableStep: PropTypes.arrayOf(PropTypes.number),
  currentStep: PropTypes.arrayOf(PropTypes.number),
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      steps: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  onClick: PropTypes.func,
};

OnboardingNavigation.defaultProps = {
  availableStep: [0, 0],
  currentStep: [0, 0],
  navigation: [],
  onClick: Function.prototype,
};

export default OnboardingNavigation;
