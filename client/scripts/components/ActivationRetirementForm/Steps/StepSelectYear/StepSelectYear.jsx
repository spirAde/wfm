import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import moment from 'moment';

import { Button, Heading, TextLink } from '../../../UI';

import styles from './StepSelectYear.css';

const cx = classNames.bind(styles);

const StepSelectYear = ({ onSelectYear, onClickFAQ }) => {
  const currYear = moment().get('year');
  const prevYear = moment().subtract(1, 'year').get('year');

  const handleClickYear = (year, event) => {
    event.preventDefault();

    return onSelectYear(year);
  };

  return (
    <div className={cx('StepSelectYear')}>
      <Heading text="Activate your retirement account" />
      <p>
        Your WorthFM Retirement Account will be a Traditional IRA.
      </p>
      <p>
        Do you want to start your WorthFM Retirement
        Account with contributions for {prevYear} or {currYear}?
      </p>
      <div className={cx('Row')}>
        <div className={cx('Buttons')}>
          <Button
            label={`${prevYear}`}
            icon="arrow-right"
            iconAlign="right"
            className={cx('Button')}
            onClick={handleClickYear.bind(this, prevYear)}
          />
          <Button
            label={`${currYear}`}
            icon="arrow-right"
            iconAlign="right"
            onClick={handleClickYear.bind(this, currYear)}
          />
        </div>
        <TextLink
          text="Commonly asked questions about IRAs"
          onClick={onClickFAQ}
          className={cx('TextLink')}
        />
      </div>
      <div className={cx('Row')}>
        <Button
          label="I’ll contribute later"
          kind="link"
          icon="arrow-left"
          iconAlign="left"
          to="/dashboard"
        />
      </div>
    </div>
  );
};

StepSelectYear.displayName = 'StepSelectYear';

StepSelectYear.propTypes = {
  onSelectYear: PropTypes.func,
  onClickFAQ: PropTypes.func,
};

StepSelectYear.defaultProps = {
  onSelectYear: Function.prototype,
  onClickFAQ: Function.prototype,
};

export default StepSelectYear;
