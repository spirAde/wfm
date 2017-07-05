import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

class FinancesPage extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <Helmet title="Finances" />
        FinancesPage
      </div>
    );
  }
}

FinancesPage.displayName = 'FinancesPage';

FinancesPage.propTypes = {
  dispatch: PropTypes.func,
};

FinancesPage.defaultProps = {
  dispatch: Function.prototype,
};

export default FinancesPage;
