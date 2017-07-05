import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import numeral from 'numeral';
import capitalize from 'lodash/capitalize';

import { Heading, Button } from '../../../UI';

import styles from './StepFinish.css';

const cx = classNames.bind(styles);

const StepFinish = ({ amount, account, onClickFinish }) => (
  <div className={cx('StepFinish')}>
    <Heading text="Your withdraw was successful" />
    <p>
      We will transfer {numeral(amount).format('$0,0.00')}&nbsp;
      from your WorthFM {capitalize(account)} account
      to your BANK OF AMERICA, N.A. (3905) account.
      Withdraw typically take 3-5 business days.
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
  account: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  onClickFinish: PropTypes.func.isRequired,
};

StepFinish.defaultProps = {
  amount: undefined,
  account: undefined,
};

export default StepFinish;
