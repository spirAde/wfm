import { createSelector } from 'reselect';

const navigationSelector = state => state.onboarding.navigation;
const currentStepSelector = state => state.onboarding.currentStep;
const availableStepSelector = state => state.onboarding.availableStep;
const formValuesSelector = state => state.onboarding.formValues;

const OnboardingSelectors = createSelector(
  availableStepSelector,
  currentStepSelector,
  formValuesSelector,
  navigationSelector,
  (availableStep, currentStep, formValues, navigation) => ({
    availableStep,
    currentStep,
    formValues,
    navigation,
  }),
);

export default OnboardingSelectors;
