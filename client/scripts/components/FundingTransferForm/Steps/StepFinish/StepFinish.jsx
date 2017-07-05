import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import numeral from 'numeral';
import capitalize from 'lodash/capitalize';

import { Heading, Button } from '../../../UI';

import styles from './StepFinish.css';

const cx = classNames.bind(styles);

const StepFinish = ({ amount, from, to, onClickFinish }) => (
  <div className={cx('StepFinish')}>
    <Heading text="Your transfer was successful" />
    <p>
      We will transfer {numeral(amount).format('$0,0.00')}&nbsp;
      from your WorthFM {capitalize(from)} account
      to your WorthFM {capitalize(to)} account.
      Transfers typically take 3-5 business days.
    </p>
    <div className={cx('Row')}>
      <Button
        label="Done"
        icon="arrow-right"
        iconAlign="right"
        onClick={onClickFinish}
      />
    </div>
  </div>
);

StepFinish.displayName = 'StepFinish';

StepFinish.propTypes = {
  amount: PropTypes.number,
  from: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  to: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  onClickFinish: PropTypes.func.isRequired,
};

StepFinish.defaultProps = {
  amount: undefined,
  from: undefined,
  to: undefined,
};

export default StepFinish;
