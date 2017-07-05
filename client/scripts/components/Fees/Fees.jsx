import React, { PropTypes } from 'react';
import numeral from 'numeral';

import { Heading, TextLink } from '../UI';

const Fees = ({ totalFees, yearFees }) => {
  const formattedTotalFees = numeral(totalFees).format('$0,0.00');
  const formattedYearFees = numeral(yearFees).format('$0,0.00');

  return (
    <div>
      <Heading text="Fees" />
      <p>
        Fees charged by WorthFM this calendar year: <b>{formattedYearFees}</b>
      </p>
      {/*
        <p>
          Total fees charged by WorthFM: <b>{formattedTotalFees}</b>
        </p>
      */}
      <p>
        <b>Here’s our fees breakdown:</b><br />
        WorthFM charges 0.5% annually on your investment and retirements accounts,
        billed at the end of the month. Savings is free.
      </p>
      <p>
        <TextLink
          target="_blank"
          to="https://my.worthfm.com/terms/fees"
          text="Our fee structure is explained here"
        />
      </p>
    </div>
  );
};

Fees.displayName = 'Fees';

Fees.propTypes = {
  totalFees: PropTypes.number,
  yearFees: PropTypes.number,
};

Fees.defaultProps = {
  totalFees: 0,
  yearFees: 0,
};

export default Fees;
