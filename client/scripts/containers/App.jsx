import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';

import bowser from 'bowser';

import loadSprite from '../utils/sprite';
import getLayout from '../utils/layout';

import AppSelectors from '../selectors/AppSelectors';

import LayoutWrapper from '../containers/LayoutWrapper/LayoutWrapper';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import { checkDevice } from '../actions/application';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    if (__CLIENT__) {
      // don't remove this line, webpack-svgstore-plugin AST parser orientates by __svg__
      const __svg__ = { path: '../../images/icons/*.svg', name: '[hash].sprite.svg' };
      loadSprite(__svg__);

      dispatch(checkDevice(!!bowser.mobile));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { children, isLoggedIn, isMobile, vanareIsDown, location, ...otherProps } = this.props;

    const layout = getLayout(location.pathname);

    return (
      <div>
        <Helmet
          title="WorthFM"
          titleTemplate="WorthFM | %s"
          htmlAttributes={{
            lang: 'en-US',
          }}
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          ]}
        />
        <Header
          isLoggedIn={isLoggedIn}
        />
        <LayoutWrapper layout={layout}>
          {
            React.cloneElement(children, {
              isLoggedIn,
              isMobile,
              vanareIsDown,
              location,
              ...otherProps,
            })
          }
        </LayoutWrapper>
        <Footer />
      </div>
    );
  }
}

App.displayName = 'App';

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool,
  isMobile: PropTypes.bool,
  vanareIsDown: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

App.defaultProps = {
  isLoggedIn: false,
  isMobile: false,
  vanareIsDown: false,
};

export default connect(AppSelectors)(App);
