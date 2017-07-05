import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';

import styles from './RadioGroup.css';

const cx = classNames.bind(styles);

class RadioGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialChecked || props.value,
    };

    this.handleChildChange = this.handleChildChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleChildChange(value, checked) {
    const { value: checkedValue } = this.state;

    if (checkedValue !== value && checked) {
      this.setState({ value });
      this.props.onChange(value);
    }
  }

  renderChildren() {
    const { value: checkedValue } = this.state;
    const { children, name } = this.props;

    return children.map((child, idx) => {
      const { checked, defaultChecked, value, className } = child.props;

      const isChecked = checked || defaultChecked || checkedValue === value;

      return React.cloneElement(child, {
        onChange: this.handleChildChange,
        key: `radio-${idx}`,
        checked: isChecked,
        className: cx('Item', className),
        value,
      });
    });
  }

  render() {
    const { align, className } = this.props;

    const classes = cx('RadioGroup', className, {
      AlignRow: align === 'row',
    });

    const renderedChildren = this.renderChildren();

    return (
      <div className={classes}>
        {renderedChildren}
      </div>
    );
  }
}

RadioGroup.displayName = 'RadioGroup';

RadioGroup.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  align: PropTypes.oneOf(['row', 'column']),
  onChange: PropTypes.func,
  initialChecked: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
};

RadioGroup.defaultProps = {
  name: '',
  onChange: Function.prototype,
  initialChecked: '',
  value: '',
  align: 'column',
  children: [],
  className: '',
};

export default RadioGroup;
