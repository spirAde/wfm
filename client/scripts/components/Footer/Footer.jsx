import React from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';

import moment from 'moment';

import styles from './Footer.css';

import logoImg from '../../../images/logo-footer.png';
import ameritradeImg from '../../../images/ameritrade.png';

const YEAR = moment().get('year');

const cx = classNames.bind(styles);

const Footer = () => (
  <footer className={cx('Footer')}>
    <div className={cx('Wrapper')}>
      <div className={cx('LeftColumn')}>
        <img src={logoImg} alt="" />
        <div className={cx('InfoContainer')}>
          <p>
            8331 Germantown Ave<br />
            Philadelphia, PA 19118
          </p>
          <p className={cx('Address')}>
            <a href="mailto:support@worthfm.com">support@worthfm.com</a><br />
            <a href="tel:1-844-WORTHFM">1-844-WORTHFM</a>
          </p>
        </div>
      </div>
      <div className={cx('RightColumn')}>
        <div className={cx('RightColumnSection')}>
          <p className={cx('Ameritrade')}>
            <img src={ameritradeImg} alt="" />
          </p>
          <p className={cx('TDInfo')}>
            WorthFM has appointed TD Ameritrade Institutional to provide custodial services.<br />
            Read the <a href="http://worthfm-landing.4xxi.com/assets/pdf/Account_Protection_FDIC_and_SIPC.pdf" target="_black">
            TD Ameritrade Account Protection Guarantee</a>.
          </p>
        </div>
        <hr />
        <div className={cx('BottomSection')}>
          <p>
            © {YEAR} WorthFM All rights reserved. &nbsp;&nbsp;&nbsp;
            <Link to="/terms/privacy-policy" target="_blank">
              Privacy Policy
            </Link>&nbsp;
            |&nbsp;
            <Link to="/terms/terms-of-use" target="_blank">Terms of Use</Link>
          </p>
          <p>
            Worth Financial Management LLC (WorthFM) is a registered investment
            advisor with the U.S. Securities and Exchange Commission (&quot;SEC&quot;).
            By using WorthFM’s products you accept to our
            &nbsp;<Link to="/terms/terms-of-use" target="_blank">Terms of Use</Link>
            &nbsp;and <Link to="/terms/client-investment-advisory-agreement" target="_blank">Client Investment Agreement</Link>.
            Please read our <Link to="/terms/privacy-policy" target="_blank">Privacy</Link>
            &nbsp;and <Link to="/terms/security" target="_blank">Security</Link> Policies.
            All questions should be directed at WorthFM Client at <a href="mailto:support@worthfm.com">support@worthfm.com</a>.
          </p>
          <p>
            TD Ameritrade, Inc. is the firm what we use to custody out client assets.
            TD Ameritrade and WorthFM, are separate and unaffiliated firms, and are not
            responsible for each other&apos;s services or policies.
            TD Ameritrade does not endorse or recommend any advisor and the use of
            the TD Ameritrade logo does not represent the endorsement of recommendation
            of any advisor. Brokerage services provided by TD Ameritrade Institutional,
            Division of TD Ameritrade, Inc., member FINRA/SIPC. TD Ameritrade is a
            trademark jointly owned by TD Ameritrade IP Company, Inc.
            and The Toronto-Dominion Bank. Used with permission.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

Footer.displayName = 'Footer';

export default Footer;
