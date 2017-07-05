import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import numeral from 'numeral';
import capitalize from 'lodash/capitalize';

import { Heading, Button } from '../../../UI';

import styles from './StepConfirmCacheInsufficient.css';

const cx = classNames.bind(styles);

const StepConfirmCacheInsufficient = ({ amount, account, onSubmit, onClickPrevPage }) => (
  <div className={cx('StepConfirmCacheInsufficient')}>
    <Heading text="Please confirm transfer" />
    <p>
      We will sell {`${numeral(amount).format('$0,0.00')}`} from your WorthFM {capitalize(account)} Account and
      transfer the funds to your BANK OF AMERICA, N.A. (3905) account.
    </p>
    <div className={cx('Row')}>
      <Button
        label="Submit"
        icon="arrow-right"
        iconAlign="right"
        onClick={onSubmit}
      />
      <span className={cx('SellingText')}>
        We optimize sale of investments to minimize tax impact.
        You will receive a 1099-B form at the end of the year for your taxes.
      </span>
    </div>
    <div className={cx('Row')}>
      <Button
        kind="link"
        icon="arrow-left"
        iconAlign="left"
        label="Go back"
        onClick={onClickPrevPage}
      />
    </div>
  </div>
);

StepConfirmCacheInsufficient.displayName = 'StepConfirmCacheInsufficient';

StepConfirmCacheInsufficient.propTypes = {
  amount: PropTypes.number,
  account: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  onSubmit: PropTypes.func.isRequired,
  onClickPrevPage: PropTypes.func.isRequired,
};

StepConfirmCacheInsufficient.defaultProps = {
  amount: undefined,
  account: undefined,
};

export default StepConfirmCacheInsufficient;
