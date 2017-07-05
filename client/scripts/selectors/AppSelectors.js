import { createSelector } from 'reselect';

const isLoggedInSelector = state => state.user.isLoggedIn;
const isMobileSelector = state => state.application.isMobile;
const vanareIsDownSelector = state => state.application.vanareIsDown;

const AppSelectors = createSelector(
  isLoggedInSelector,
  isMobileSelector,
  vanareIsDownSelector,
  (isLoggedIn, isMobile, vanareIsDown) => ({
    isLoggedIn,
    isMobile,
    vanareIsDown,
  }),
);

export default AppSelectors;
