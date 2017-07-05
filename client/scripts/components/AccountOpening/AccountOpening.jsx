import React, { PropTypes } from 'react';

import numeral from 'numeral';
import capitalize from 'lodash/capitalize';

import { Heading } from '../UI';

const AccountOpening = ({ account, initialDeposit }) => (
  <div>
    <Heading text="Your Account has been approved" />
    <p>
      Your WorthFM account is now open. The {numeral(initialDeposit).format('$0,0.00')} you
      deposited when you signed up will go to your {capitalize(account)} Account.
      You will see these funds in your WorthFM account within a few days.
    </p>
  </div>
);

AccountOpening.displayName = 'AccountOpening';

AccountOpening.propTypes = {
  account: PropTypes.oneOf(['savings', 'investment', 'retirement']),
  initialDeposit: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

AccountOpening.defaultProps = {
  account: undefined,
  initialDeposit: 0,
};

export default AccountOpening;
