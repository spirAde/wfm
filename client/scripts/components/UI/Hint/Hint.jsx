import React, { Component, PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import classNames from 'classnames/bind';

import styles from './Hint.css';

const cx = classNames.bind(styles);

class Hint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleClickOutside() {
    this.setState({
      visible: false,
    });
  }

  handleMouseOver(event) {
    event.preventDefault();

    this.setState({ visible: true });
  }

  handleMouseOut(event) {
    event.preventDefault();

    this.setState({ visible: false });
  }

  render() {
    const { children, className } = this.props;
    const { visible } = this.state;

    const hintClasses = cx('Hint', className);
    const contentClasses = cx('Content', {
      Visible: visible,
    });

    return (
      <div className={hintClasses}>
        <div
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <figure />
          <div className={contentClasses}>{children}</div>
        </div>
      </div>
    );
  }
}

Hint.displayName = 'Hint';

Hint.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Hint.defaultProps = {
  className: '',
};

export default onClickOutside(Hint);
export { Hint as PureHint }; // for test
