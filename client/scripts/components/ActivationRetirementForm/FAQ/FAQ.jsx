import React from 'react';
import classNames from 'classnames/bind';

import moment from 'moment';

import { TextLink } from '../../UI';

import styles from './FAQ.css';

const YEAR = moment().get('year');

const FEDERAL_LINK = 'https://www.irs.gov/Retirement-Plans/Plan-Participant,-Employee/Retirement-Topics-IRA-Contribution-Limits';
const LIMITS_LINK = 'https://www.irs.gov/Retirement-Plans/IRA-Deduction-Limits';
const HELP_LINK = 'https://www.irs.gov/Retirement-Plans/Traditional-and-Roth-IRAs';

const cx = classNames.bind(styles);

const FAQ = () => (
  <div className={cx('FAQ')}>
    <ol>
      <li>
        <p>
          Can I have a 401k and an IRA?
        </p>
        <p className={cx('Small')}>
          Yes. You are eligible to fund your IRA up to $5,500 and your 401k up to $18,500
          in {YEAR}, based on&nbsp;
          <TextLink target="_blank" to={FEDERAL_LINK}>
            federal limits
          </TextLink>.
          There are restrictions on how much you can deduct from your taxes.
          Consult your accountant or&nbsp;
          <TextLink target="_blank" to={LIMITS_LINK}>
            click for more information
          </TextLink>.
        </p>
      </li>
      <li>
        <p>
          Can I withdraw from my IRA?
        </p>
        <p className={cx('Small')}>
          It depends. The internal Revenue Service has several rules that you should be aware of.
          Please consult the IRS&nbsp;
          <TextLink target="_blank" to={HELP_LINK}>
            help pages
          </TextLink>
          for the latest guidelines.
        </p>
      </li>
      <li>
        <p>
          What if I already have an IRA? Can I have multiple IRA accounts?
        </p>
        <p className={cx('Small')}>
          Yes. You can have multiple IRAs.
          The combined federal maximum contribution limit for all your IRAs is $5,500 per year.
        </p>
      </li>
      <li>
        <p>
          Can I have a Traditional and a Roth IRA?
        </p>
        <p className={cx('Small')}>
          Yes. You may have both a Roth and a Traditional IRA and the maximum contribution limit
          is $5,500 per year for all IRAs. You must be under specific income limits to be eligible
          for a Roth IRA. You cannot contribute to a previously set up Roth IRA if your income
          exceeds these limits.
        </p>
      </li>
    </ol>
  </div>
);

FAQ.displayName = 'FAQ';

export default FAQ;
