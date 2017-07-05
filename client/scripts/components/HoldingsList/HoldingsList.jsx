import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import { Heading } from '../UI';

import styles from './HoldingsList.css';

const cx = classNames.bind(styles);

class HoldingsList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className={cx('HoldingsList')}>
        <Heading text="Holdings" />
      </div>
    );
  }
}

HoldingsList.displayName = 'HoldingsList';

HoldingsList.propTypes = {
  accountType: PropTypes.oneOf(['investment', 'retirement']),
};

HoldingsList.defaultProps = {
  accountType: 'investment',
};

export default HoldingsList;
