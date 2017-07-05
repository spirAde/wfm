import React, { PropTypes } from 'react';

import moment from 'moment';
import numeral from 'numeral';

import { TextLink, Heading } from '../UI';

const RecurringNotEnoughMoney = ({ transaction, nextTransaction }) => (
  <div>
    <Heading text="We could not add requested funds to your account" />
    <p>
      Your scheduled transfer of {numeral(transaction.amount).format('$0,0.00')}&nbsp;
      on {moment(transaction.date, 'YYYY-MM-DD').format('MM/DD/YYYY')} could not be completed.
      {
        nextTransaction &&
        ` The next transfer in this schedule is on \n
        ${moment(nextTransaction.date, 'YYYY-MM-DD').format('MM/DD/YYYY')}.`
      }
    </p>
    <TextLink text="View this schedule" to="/funding/transactions" />
  </div>
);

RecurringNotEnoughMoney.displayName = 'RecurringNotEnoughMoney';

RecurringNotEnoughMoney.propTypes = {
  transaction: PropTypes.object,
  nextTransaction: PropTypes.object,
};

RecurringNotEnoughMoney.defaultProps = {
  transaction: {},
  nextTransaction: {},
};

export default RecurringNotEnoughMoney;
