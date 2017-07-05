import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import { Notification } from '../../components/UI';

import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation';

import styles from './DashboardWrapper.css';

const cx = classNames.bind(styles);

class DashboardWrapper extends Component {
  constructor(props) {
    super(props);

    this.handleChangeLocation = this.handleChangeLocation.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleChangeLocation(location) {
    this.props.router.push(location.replace(window.location.origin, ''));
  }

  render() {
    const { children, isMobile, ...otherProps } = this.props;

    return (
      <div>
        <DashboardNavigation
          isBurgerMenu={isMobile}
          onChangeLocation={this.handleChangeLocation}
        />
        <div className={cx('DashboardWrapper')}>
          <Notification>
            <span>Smth notification text</span>
          </Notification>
          {
            React.cloneElement(children, {
              ...otherProps,
            })
          }
        </div>
      </div>
    );
  }
}

DashboardWrapper.displayName = 'DashboardWrapper';

DashboardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  isMobile: PropTypes.bool,
  vanareIsDown: PropTypes.bool,
};

DashboardWrapper.defaultProps = {
  isMobile: false,
  vanareIsDown: false,
};

export default DashboardWrapper;
