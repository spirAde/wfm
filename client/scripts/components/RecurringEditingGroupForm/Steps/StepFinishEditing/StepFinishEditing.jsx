import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import numeral from 'numeral';
import capitalize from 'lodash/capitalize';

import { Button, Heading } from '../../../UI';

import styles from './StepFinishEditing.css';

const cx = classNames.bind(styles);

// TODO: change text
const StepFinishEditing = ({
  amount,
  periodicityText,
  closestRecurringDate,
  account,
  onClickFinish,
}) => (
  <div className={cx('StepFinishEditing')}>
    <Heading text="Edit Schedule" />
    <p>
      Your recurring transfer of&nbsp;
      {numeral(amount).format('$0,0.00')} to WorthFM {capitalize(account)} Account
      will begin on {closestRecurringDate} and occur on {periodicityText}.
    </p>
    <div className={cx('Row')}>
      <Button
        label="Done"
        icon="arrow-right"
        iconAlign="right"
        className={cx('Button')}
        onClick={onClickFinish}
      />
    </div>
  </div>
);

StepFinishEditing.displayName = 'StepFinishEditing';

StepFinishEditing.propTypes = {
  amount: PropTypes.number,
  periodicityText: PropTypes.string,
  closestRecurringDate: PropTypes.string,
  account: PropTypes.oneOf(['savings', 'investment', 'retirement', undefined]),
  onClickFinish: PropTypes.func,
};

StepFinishEditing.defaultProps = {
  amount: 0,
  periodicityText: '',
  closestRecurringDate: '',
  account: undefined,
  onClickFinish: Function.prototype,
};

export default StepFinishEditing;
