import React from 'react';

import classNames from 'classnames/bind';

import { Button, Heading } from '../UI';

import styles from './MoneyTypeTakeAssessment.css';

import visionaryImageSrc from '../../../images/visionary.svg';
import producerImageSrc from '../../../images/producer.svg';
import nurturerImageSrc from '../../../images/nurturer.svg';
import epicureImageSrc from '../../../images/epicure.svg';
import independentImageSrc from '../../../images/independent.svg';

const cx = classNames.bind(styles);

const MoneyTypeTakeAssessment = () => (
  <div className={cx('MoneyTypeTakeAssessment')}>
    <Heading className={cx('Heading')}>
      <b>What’s your</b>
      <br />
      <span>
        Money
        <span>T</span>
        ype
      </span>
      <b>?</b>
    </Heading>
    <div className={cx('Types')}>
      <div className={cx('Type')}>
        <span>Visionary</span>
        <div className={cx('Picture')}>
          <img src={visionaryImageSrc} alt="" />
        </div>
      </div>
      <div className={cx('Divider')} />
      <div className={cx('Type')}>
        <span>Producer</span>
        <div className={cx('Picture')}>
          <img src={producerImageSrc} alt="" />
        </div>
      </div>
      <div className={cx('Divider')} />
      <div className={cx('Type')}>
        <span>Nurturer</span>
        <div className={cx('Picture')}>
          <img src={nurturerImageSrc} alt="" />
        </div>
      </div>
      <div className={cx('Divider')} />
      <div className={cx('Type')}>
        <span>Epicure</span>
        <div className={cx('Picture')}>
          <img src={epicureImageSrc} alt="" />
        </div>
      </div>
      <div className={cx('Divider')} />
      <div className={cx('Type')}>
        <span>Independent</span>
        <div className={cx('Picture')}>
          <img src={independentImageSrc} alt="" />
        </div>
      </div>
    </div>
    <p>
      Your MoneyType gives you insights into how you think about and manage money.
      We’ll use this information to personalize your WorthFM experience.
    </p>
    <div className={cx('Row')}>
      <Button
        label="Take MoneyType"
        icon="arrow-right"
        iconAlign="right"
        to="/moneytype"
        className={cx('Button')}
      />
    </div>
  </div>
);

MoneyTypeTakeAssessment.displayName = 'MoneyTypeTakeAssessment';

MoneyTypeTakeAssessment.propTypes = {};

MoneyTypeTakeAssessment.defaultProps = {};

export default MoneyTypeTakeAssessment;
