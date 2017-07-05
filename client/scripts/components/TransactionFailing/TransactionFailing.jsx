import React from 'react';

import { Heading } from '../UI';

const TransactionFailing = () => (
  <div>
    <Heading text="We could not add requested funds to your account" />
    <p>
      We are unable to complete funding at this time. Please chat with the
      WorthFM client service team to resolve.
    </p>
  </div>
);

TransactionFailing.displayName = 'TransactionFailing';

TransactionFailing.propTypes = {};

TransactionFailing.defaultProps = {};

export default TransactionFailing;
