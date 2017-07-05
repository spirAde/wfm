import React from 'react';

import { Heading } from '../UI';

const MailFromTD = () => (
  <div>
    <Heading text="Mail from TD Ameritrade Institutional" />
    <p>
      WorthFM works with TD Ameritrade Institutional for comprehensive brokerage
      and custody services. TD Ameritrade is required to communicate with you
      directly pertaining to your accounts. You will occasionally receive email
      and mail to your address on file. For the most part, you will not need to
      take any actions on these communications and should file them with your
      other account information.
    </p>
  </div>
);

MailFromTD.displayName = 'MailFromTD';

MailFromTD.propTypes = {};

MailFromTD.defaultProps = {};

export default MailFromTD;
