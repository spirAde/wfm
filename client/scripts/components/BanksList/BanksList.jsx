import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import { Field } from '../UI';

import styles from './BanksList.css';

import bofaBankImage from '../../../images/bank-bofa.png';
import capone360BankImage from '../../../images/bank-capone360.png';
import chaseBankImage from '../../../images/bank-chase.png';
import citiBankImage from '../../../images/bank-citi.png';
import suntrustBankImage from '../../../images/bank-suntrust.png';
import tdBankImage from '../../../images/bank-td.png';
import usBankImage from '../../../images/bank-us.png';
import wellsBankImage from '../../../images/bank-wells.png';

const objectList = [
  { type: 'bofa', label: 'Bank of America' },
  { type: 'bbt', label: 'BB&T' },
  { type: 'chase', label: 'Chase' },
  { type: 'wells', label: 'Wells Fargo' },
  { type: 'citi', label: 'Citi' },
  { type: 'us', label: 'US Bank' },
  { type: 'usaa', label: 'USAA' },
  { type: 'capone360', label: 'Capital One 360' },
  { type: 'capone', label: 'Capital One' },
  { type: 'schwab', label: 'Charles Schwab' },
];

const BANK_IMAGES = {
  bofa: bofaBankImage,
  capone360: capone360BankImage,
  chase: chaseBankImage,
  citi: citiBankImage,
  suntrust: suntrustBankImage,
  td: tdBankImage,
  us: usBankImage,
  wells: wellsBankImage,
};

const cx = classNames.bind(styles);

class BanksList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderBanks() {
    const { banks, visibleBanks, onSelectBank } = this.props;

    if (!banks.length || !visibleBanks.length) return null;

    return banks.filter(bank => visibleBanks.includes(bank.type)).map(bank => (
      <a
        id={bank.type}
        className={cx('Bank')}
        key={bank.id}
        onClick={onSelectBank.bind(this, bank)}
      >
        <img src={BANK_IMAGES[bank.type]} alt="" />
      </a>
    ));
  }

  render() {
    const { onSelectBank } = this.props;

    const renderedBanks = this.renderBanks();

    const emptyResult = (
      <Link to="/survey/check">
        If you don’t see your bank listed please enter your banking information instead.
      </Link>
    );

    return (
      <div className={cx('BanksList')}>
        <div className={cx('Banks')}>
          {renderedBanks}
        </div>
        <Field
          label="Search all banks"
          type="search"
          list={objectList}
          placeholder="Enter your bank name"
          emptyResult={emptyResult}
          onSelect={onSelectBank}
        />
      </div>
    );
  }
}

BanksList.displayName = 'BanksList';

BanksList.propTypes = {
  banks: PropTypes.arrayOf(PropTypes.object),
  visibleBanks: PropTypes.arrayOf(PropTypes.string),
  onSelectBank: PropTypes.func,
};

BanksList.defaultProps = {
  banks: [],
  visibleBanks: [],
  onSelectBank: Function.prototype,
};

export default BanksList;
