import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import { Heading, Button } from '../../../UI';

import styles from './StepClientService.css';

const cx = classNames.bind(styles);

const StepClientService = ({ onClickFinish }) => (
  <div className={cx('StepClientService')}>
    <Heading text="WorthFM Client Services will contact you" />
    <p>
      WorthFM Client Services will contact you within 2 business days to complete
      the transfer or withdrawal from your WorthFM Retirement account.
    </p>
    <div className={cx('Row')}>
      <Button
        label="Close"
        icon="arrow-right"
        iconAlign="right"
        onClick={onClickFinish}
      />
    </div>
  </div>
);

StepClientService.displayName = 'StepClientService';

StepClientService.propTypes = {
  onClickFinish: PropTypes.func.isRequired,
};

StepClientService.defaultProps = {};

export default StepClientService;
