import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import styles from './SignUpPage.css';

import SignUpForm from '../../components/SignUpForm/SignUpForm';

const cx = classNames.bind(styles);

class SignUpPage extends Component {
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

  handleClickSubmit({ inviteCode, firstName, lastName, email, pwd, confirmPwd }) {
    this.setState({
      isLoading: true,
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className={cx('SignUpPage')}>
        <div className={cx('Wrapper')}>
          <div className={cx('Inner')}>
            <Helmet title="Sign Up" />
            <SignUpForm
              onSubmit={this.handleClickSubmit}
              isLoading={isLoading}
            />
            <p>
              <span>Already have account?</span>
              &nbsp;
              <Link to="/signin">Sign In.</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.displayName = 'SignUpPage';

SignUpPage.propTypes = {};

SignUpPage.defaultProps = {};

export default SignUpPage;
