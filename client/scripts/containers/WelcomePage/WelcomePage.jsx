import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import styles from './WelcomePage.css';

import Greetings from '../../components/Greetings/Greetings';

const cx = classNames.bind(styles);

class WelcomePage extends Component {
  constructor(props) {
    super(props);

    this.handleClickAccept = this.handleClickAccept.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickAccept(name, value) {
    console.log(value);
    console.log(name);
  }

  render() {
    return (
      <div className={cx('WelcomePage')}>
        <Greetings
          onClickAccept={this.handleClickAccept}
        />
      </div>
    );
  }
}

export default WelcomePage;
