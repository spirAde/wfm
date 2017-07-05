import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import SectionConductor from '../../components/SectionConductor/SectionConductor';

import styles from './FundingDepositPage.css';

const cx = classNames.bind(styles);

class FundingDepositPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className={cx('FundingDepositPage')}>
        <Helmet title="Deposit" />
        <SectionConductor
          border="bottom"
          borderColor="yellow"
          borderWidth="fat"
          component="DashboardBalance"
        />
        <SectionConductor
          component="FundingDepositForm"
        />
      </div>
    );
  }
}

FundingDepositPage.displayName = 'FundingDepositPage';

FundingDepositPage.propTypes = {
  dispatch: PropTypes.func,
};

FundingDepositPage.defaultProps = {
  dispatch: Function.prototype,
};

export default FundingDepositPage;
