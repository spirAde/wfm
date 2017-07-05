import React, { PropTypes } from 'react';

import classNames from 'classnames/bind';

import numeral from 'numeral';
import moment from 'moment';

import { TextLink } from '../../UI';

import styles from './UpcomingTransaction.css';

const cx = classNames.bind(styles);

const UpcomingTransaction = ({
  transaction: { id, status, date, original_date: originalDate, amount },
  group,
  onClickEditItem,
}) => {
  const handleClickEditItem = (event) => {
    event.preventDefault();

    onClickEditItem(group.id, id);
  };

  const isScheduled = status === 'active';

  const statusText = isScheduled ? 'Scheduled' : 'Canceled';

  const changedTextParts = [];

  if (isScheduled) {
    if (!moment(date).isSame(originalDate)) {
      changedTextParts.push(`Date changed from ${moment(originalDate).format('MM/DD/YYYY')} to ${date}`);
    }

    if (parseFloat(amount) !== parseFloat(group.amount)) {
      const formattedAmount = numeral(amount).format('$0,0.00');
      const formattedOriginalAmount = numeral(group.amount).format('$0,0.00');

      changedTextParts.push(`Amount changed from ${formattedOriginalAmount} to ${formattedAmount}`);
    }
  }

  const changedText = changedTextParts.length ? changedTextParts.join('; ') : '';

  const statusTextClass = cx('Status', {
    Scheduled: isScheduled,
    Cancelled: !isScheduled,
  });

  return (
    <div className={cx('UpcomingTransaction')}>
      {moment(date).format('MM/DD/YYYY')}
      <span className={cx('Divider')}>|</span>
      {
        isScheduled && <span className={statusTextClass}>{statusText}</span>
      }
      {
        isScheduled &&
        <span>
          <span className={cx('Divider')}>|</span>&nbsp;
          <TextLink text="Edit" className={cx('EditLink')} onClick={handleClickEditItem} />
        </span>
      }
      {
        changedText && <span>{changedText}</span>
      }
    </div>
  );
};

UpcomingTransaction.displayName = 'UpcomingTransaction';

UpcomingTransaction.propTypes = {
  transaction: PropTypes.object,
  group: PropTypes.object,
  onClickEditItem: PropTypes.func,
};

UpcomingTransaction.defaultProps = {
  transaction: undefined,
  group: undefined,
  onClickEditItem: Function.prototype,
};

export default UpcomingTransaction;
