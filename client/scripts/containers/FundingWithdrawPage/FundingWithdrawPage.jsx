import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import SectionConductor from '../../components/SectionConductor/SectionConductor';

import styles from './FundingWithdrawPage.css';

const cx = classNames.bind(styles);

class FundingWithdrawPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className={cx('FundingWithdrawPage')}>
        <Helmet title="Withdraw" />
        <SectionConductor
          border="bottom"
          borderColor="yellow"
          borderWidth="fat"
          component="DashboardBalance"
        />
        <SectionConductor
          component="FundingWithdrawForm"
        />
      </div>
    );
  }
}

FundingWithdrawPage.displayName = 'FundingWithdrawPage';

FundingWithdrawPage.propTypes = {};

FundingWithdrawPage.defaultProps = {};

export default FundingWithdrawPage;
