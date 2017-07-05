import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import { Heading, Button, TextLink } from '../../../UI';

import styles from './StepConfirmTransferFromRetirement.css';

const cx = classNames.bind(styles);

const StepConfirmTransferFromRetirement = ({ onSubmit, onClickPrevPage }) => (
  <div className={cx('StepConfirmTransferFromRetirement')}>
    <Heading text="Your Transfer is processing" />
    <p>
      Please read the following important information before withdrawing or
      transferring funds from your WorthFM Retirement account.
    </p>
    <ul>
      <li>
        Withdrawing from a Traditional IRA is a taxable event.
        You will pay tax on the amount withdrawn as income.
      </li>
      <li>
        Withdrawing from a Roth IRA is a non-taxable event if
        it occurs at least 5 years after your first Roth IRA contribution.
      </li>
      <li>
        There is a penalty of 10% in addition to the regular taxes
        you will pay if you withdraw funds from your IRA before age 59 1/2.
      </li>
      <li>
        You are required to take distributions from your Traditional IRA starting at age 70 1/2.
        These are called Required Minimum Distributions (or RMD’s).
      </li>
    </ul>
    <p>
      To continue with this withdraw or transfer, click Confirm below and WorthFM Client
      Services will contact you within 2 business days. You will need to complete an IRA
      Distribution Form the first time you make a withdrawal or transfer from your
      retirement account. If you have any questions, please contact the WorthFM Client
      Service team via chat, email
      <TextLink href="mailto:support@worthfm.com"> (support@worthfm.com)</TextLink> or phone (844-WORTHFM).
    </p>
    <div className={cx('Row')}>
      <Button
        label="Submit"
        icon="arrow-right"
        iconAlign="right"
        onClick={onSubmit}
      />
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

StepConfirmTransferFromRetirement.displayName = 'StepConfirmTransferFromRetirement';

StepConfirmTransferFromRetirement.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickPrevPage: PropTypes.func.isRequired,
};

StepConfirmTransferFromRetirement.defaultProps = {};

export default StepConfirmTransferFromRetirement;
