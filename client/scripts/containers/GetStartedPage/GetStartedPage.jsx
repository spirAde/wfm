import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

class GetStartedPage extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <Helmet title="GetStarted" />
        GetStartedPage
      </div>
    );
  }
}

GetStartedPage.displayName = 'GetStartedPage';

GetStartedPage.propTypes = {
  dispatch: PropTypes.func,
};

GetStartedPage.defaultProps = {
  dispatch: Function.prototype,
};

export default GetStartedPage;
