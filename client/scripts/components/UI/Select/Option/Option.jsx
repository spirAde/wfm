import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';

import { Icon } from '../../../UI';

import styles from './Option.css';

const cx = classNames.bind(styles);

class Option extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    const { option: { value }, isDisabled } = this.props;

    if (!isDisabled) this.props.onClick(value);
  }

  render() {
    const { option, isSelected, isDisabled } = this.props;

    const classes = cx('Option', {
      Selected: isSelected,
      Disabled: isDisabled,
    });

    const { label } = option;

    return (
      <div
        className={classes}
        onClick={this.handleClick}
      >
        {label}
        { isSelected && <Icon icon="ok" className={cx('Icon')} /> }
      </div>
    );
  }
}

Option.displayName = 'Option';

Option.defaultProps = {
  option: {
    value: '',
    label: '',
  },
  isSelected: false,
  isDisabled: false,
  onClick: Function.prototype,
};

Option.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Option;
