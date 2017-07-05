import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import styles from './CheckGroup.css';

const cx = classNames.bind(styles);

class CheckGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedValues: this.getInitialChecked(),
    };
  }

  getInitialChecked() {
    const { children, initialChecked } = this.props;

    return children.reduce((prev, next) => {
      const { checked, name } = next.props;
      const { displayName } = next.type;

      if (displayName !== 'Checkbox') console.error('CheckGroup works only with Checkbox'); // eslint-disable-line no-console
      if (!name) console.error('Each child checkbox should has name attribute'); // eslint-disable-line no-console

      if (checked || initialChecked.includes(name)) {
        prev.push(name);
      }

      return prev;
    }, []);
  }

  handleChildChange(value, checked) {
    const { checkedValues } = this.state;

    if (checked) {
      if (!checkedValues.includes(value)) {
        checkedValues.push(value);
      }
    } else if (checkedValues.includes(value)) {
      // delete unchecked value
      checkedValues.splice(checkedValues.indexOf(value), 1);
    }

    this.setState({ checkedValues });

    this.props.onChange(checkedValues);
  }

  renderChildren() {
    const { checkedValues } = this.state;
    const { children } = this.props;

    return children.map((child, idx) => {
      const { checked, name } = child.props;

      const isChecked = checked || checkedValues.includes(name);

      return React.cloneElement(child, {
        onChange: this.handleChildChange.bind(this, name),
        key: `checkbox-${idx}`,
        checked: isChecked,
        className: cx('Item'),
      });
    });
  }

  render() {
    const { align } = this.props;

    const classes = cx('CheckGroup', {
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

CheckGroup.displayName = 'CheckGroup';

CheckGroup.propTypes = {
  align: PropTypes.oneOf(['row', 'column']),
  onChange: PropTypes.func,
  initialChecked: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

CheckGroup.defaultProps = {
  onChange: Function.prototype,
  initialChecked: [],
  children: [],
  align: 'column',
};

export default CheckGroup;
