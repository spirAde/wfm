import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import moment from 'moment';

import styles from './PendingTransaction.css';

const cx = classNames.bind(styles);

const PendingTransaction = ({ transaction: { date } }) => (
  <div className={cx('PendingTransaction')}>
    {moment(date).format('MM/DD/YYYY')}
    <span className={cx('Divider')}>|</span>
    <span className={cx('Processing')}>Processing</span>
  </div>
);

PendingTransaction.displayName = 'PendingTransaction';

PendingTransaction.propTypes = {
  transaction: PropTypes.object,
};

PendingTransaction.defaultProps = {
  transaction: undefined,
};

export default PendingTransaction;
