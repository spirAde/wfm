import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import classNames from 'classnames/bind';

import { Button } from '../../components/UI';

import styles from './NotFoundPage.css';

const cx = classNames.bind(styles);

const NotFoundPage = ({ router }) => {
  const handleClick = (event) => {
    event.preventDefault();

    router.goBack();
  };

  return (
    <div className={cx('NotFoundPage')}>
      <Helmet title="Not Found" />
      <div className={cx('ErrorSection')}>
        <div className={cx('Number')}>404</div>
        <div className={cx('Description')}>PAGE NOT FOUND. OOPS.</div>
        <div className={cx('Text')}>
          We meant to build this page,<br />
          but we are too busy making<br />
          money for you
        </div>
        <div className={cx('GoBack')}>
          <Button
            label="Go back"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

NotFoundPage.displayName = 'NotFoundPage';

NotFoundPage.propTypes = {
  router: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default NotFoundPage;
