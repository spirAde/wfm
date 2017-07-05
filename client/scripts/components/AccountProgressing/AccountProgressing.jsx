import React from 'react';

import { Heading } from '../UI';

const AccountProgressing = () => (
  <div>
    <Heading text="Account Set Up In Progress" />
    <p>
      We’re setting up your WorthFM account, which can take up to 48 hours to open
      and a few days more for your deposit to complete. In the meantime, get
      to know your WorthFM dashboard.
    </p>
    <p>
      Below you’ll see your ClarityCue, designed to educate, entertain, and guide you.
      As we get to know you, your CueCards will be personalized to you.
      Next, check out your Accounts pages for a look at what to expect when your
      accounts are approved and funded.
    </p>
  </div>
);

AccountProgressing.displayName = 'AccountProgressing';

AccountProgressing.propTypes = {};

AccountProgressing.defaultProps = {};

export default AccountProgressing;
