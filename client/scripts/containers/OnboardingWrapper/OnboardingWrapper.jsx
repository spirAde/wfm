import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import warning from 'warning';
import shallowCompare from 'react-addons-shallow-compare';

import findIndex from 'lodash/findIndex';

import OnboardingSelectors from '../../selectors/OnboardingSelectors';

import OnboardingNavigation from '../../components/OnboardingNavigation/OnboardingNavigation';

import { changeStep } from '../../actions/onboarding';

class OnboardingWrapper extends Component {
  constructor(props) {
    super(props);

    this.checkCurrentStep = this.checkCurrentStep.bind(this);
    this.handleClickNavigation = this.handleClickNavigation.bind(this);
  }

  componentDidMount() {
    const { location: { pathname } } = this.props;

    if (pathname !== '/welcome') {
      this.checkCurrentStep(); // if user open url directly, or return from 404
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  checkCurrentStep() {
    const {
      location: { pathname },
      currentStep: [currentGroupIndex, currentStepIndex],
      navigation,
      dispatch,
    } = this.props;

    const groups = navigation.map(group => group.steps);
    const groupIndex = findIndex(groups, group => group.includes(pathname));
    const stepIndex = findIndex(navigation[groupIndex].steps, step => step === pathname);

    if (groupIndex !== currentGroupIndex || stepIndex !== currentStepIndex) {
      warning(
        false,
        'Onboarding current step was change because store current ' +
        `step equals [${currentGroupIndex}, ${currentStepIndex}], ` +
        `but by location pathname corresponds to step [${groupIndex}, ${stepIndex}]`,
      );

      dispatch(changeStep([groupIndex, stepIndex]));
    }
  }

  handleClickNavigation(event, step, link) {
    event.preventDefault();

    const { dispatch, router } = this.props;

    dispatch(changeStep(step));

    router.push(link);
  }

  render() {
    const {
      availableStep,
      children,
      currentStep,
      navigation,
      location,
      ...otherProps
    } = this.props;

    const { pathname } = location;

    return (
      <div>
        {
          pathname !== '/welcome' &&
          <OnboardingNavigation
            availableStep={availableStep}
            navigation={navigation}
            currentStep={currentStep}
            onClick={this.handleClickNavigation}
          />
        }
        {
          React.cloneElement(children, {
            availableStep,
            currentStep,
            navigation,
            location,
            ...otherProps,
          })
        }
      </div>
    );
  }
}

OnboardingWrapper.displayName = 'OnboardingWrapper';

OnboardingWrapper.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  ...OnboardingNavigation.propTypes,
};

OnboardingWrapper.defaultProps = {
  availableStep: [0, 0],
  children: {},
  currentStep: [0, 0],
  navigation: [],
  dispatch: Function.prototype,
};

export default connect(OnboardingSelectors)(OnboardingWrapper);
