import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import styles from './ResetPasswordPage.css';

import { Heading } from '../../components/UI';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';

const cx = classNames.bind(styles);

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickSubmit({ email }) {
    this.setState({
      isLoading: true,
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className={cx('ResetPasswordPage')}>
        <div className={cx('Wrapper')}>
          <div className={cx('Inner')}>
            <Helmet title="Reset Password" />
            <Heading text="Forgot your password?" className={cx('Heading')} />
            <ResetPasswordForm
              onSubmit={this.handleClickSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {

};

export default ResetPasswordPage;
