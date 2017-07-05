import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import { matchStrict } from '../../utils/match';

import styles from './LayoutWrapper.css';

const cx = classNames.bind(styles);

const LayoutWrapper = ({ children, layout = 'dashboard' }) => {
  const wrapperClass = matchStrict(layout, {
    auth: 'Auth',
    survey: 'Survey',
    dashboard: 'Dashboard',
    accounts: 'Accounts',
    funding: 'Funding',
    moneytype: 'MoneyType',
    notFound: 'NotFound',
  }, '');

  return (
    <main>
      <div className={cx('LayoutWrapper')}>
        <div className={cx('Wrapper', wrapperClass)}>
          <div className={cx('Inner')}>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

LayoutWrapper.displayName = 'LayoutWrapper';

LayoutWrapper.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.oneOf([
    'auth',
    'survey',
    'dashboard',
    'terms',
    'feedback',
    'notFound',
    'accounts',
    'funding',
    'moneytype',
  ]),
};

LayoutWrapper.defaultProps = {
  children: {},
  layout: 'dashboard',
};

export default LayoutWrapper;
