import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import SectionConductor from '../../components/SectionConductor/SectionConductor';

import styles from './FundingTransferPage.css';

const cx = classNames.bind(styles);

class FundingTransferPage extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className={cx('FundingTransferPage')}>
        <Helmet title="Transfer" />
        <SectionConductor
          border="bottom"
          borderColor="yellow"
          borderWidth="fat"
          component="DashboardBalance"
        />
        <SectionConductor
          component="FundingTransferForm"
        />
      </div>
    );
  }
}

FundingTransferPage.displayName = 'FundingTransferPage';

FundingTransferPage.propTypes = {};

FundingTransferPage.defaultProps = {};

export default FundingTransferPage;
