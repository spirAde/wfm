import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';

import styles from './Header.css';

const cx = classNames.bind(styles);

const Header = ({ isLoggedIn }) => (
  <header className={cx('Header')}>
    <div className={cx('Wrapper')}>
      <Link href="/welcome" />
      <div className={cx('LinkBlock')}>
        <Link to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  </header>
);

Header.displayName = 'Header';

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  isLoggedIn: false,
};

export default Header;
