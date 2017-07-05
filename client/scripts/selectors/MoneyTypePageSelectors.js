import { createSelector } from 'reselect';

import { removeEmptyContent } from '../utils/helpers/moneytype';

const questionsSelector = state => state.moneytype.questions;
const questionsAreLoadingSelector = state => state.moneytype.questionsAreLoading;

const contentSelector = state => state.moneytype.content;
const contentIsLoadingSelector = state => state.moneytype.contentIsLoading;

const statsAreLoadingSelector = state => state.moneytype.statsAreLoading;
const statsSelector = state => state.user.moneyTypeStats;

const showTypesAreLoadingSelector = state => state.moneytype.showTypesAreLoading;
const showTypesSelector = state => state.moneytype.showTypes;

const moneyTypeSelector = createSelector(
  statsSelector,
  statsAreLoadingSelector,

  questionsSelector,
  questionsAreLoadingSelector,

  contentSelector,
  contentIsLoadingSelector,

  showTypesSelector,
  showTypesAreLoadingSelector,
  (
    stats,
    statsAreLoading,
    questions,
    questionsAreLoading,
    content,
    contentIsLoading,
    showTypes,
    showTypesAreLoading,
  ) => ({
    questions,
    content: removeEmptyContent(content),
    isLoading: statsAreLoading || questionsAreLoading || contentIsLoading || showTypesAreLoading,
    stats,
    showTypes,
  }),
);

export default moneyTypeSelector;
