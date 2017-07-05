import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import styles from './SignInPage.css';

import SignInForm from '../../components/SignInForm/SignInForm';
import { Heading } from '../../components/UI';

import { signin } from '../../actions/user';

const cx = classNames.bind(styles);

class SignInPage extends Component {
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

  handleClickSubmit({ email, pwd }) {
    const { dispatch } = this.props;

    this.setState({
      isLoading: true,
    }, () => this.props.router.push('/welcome'));//dispatch(signin(email, pwd)));
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className={cx('SignInPage')}>
        <div className={cx('Wrapper')}>
          <div className={cx('Inner')}>
            <Helmet title="Sign In" />
            <Heading text="Sign in" className={cx('Heading')} />
            <SignInForm
              onSubmit={this.handleClickSubmit}
              isLoading={isLoading}
            />
            <p>
              <span>Don’t have an account? </span>
              <Link to="/signup">Sign up now.</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SignInPage.displayName = 'SignInPage';

SignInPage.propTypes = {
  dispatch: PropTypes.func,
};

SignInPage.defaultProps = {
  dispatch: Function.prototype,
};

export default SignInPage;
