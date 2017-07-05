import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';

import debounce from 'lodash/debounce';
import trim from 'lodash/trim';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

import InputText from '../InputText/InputText';

import styles from './InputSearch.css';

const cx = classNames.bind(styles);

class InputSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: '',
      formatted: props.list,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getFormattedItems(format) {
    const { list } = this.props;

    return list.filter((item) => {
      if (isString(item)) {
        return item.includes(format);
      } else if (isObject(item) && item.label) {
        return item.label.includes(format);
      }

      console.warn(`Item ${item} is incorrect, InputSearch works with string and object(value, label)`);

      return false;
    });
  }

  handleChange(event) {
    event.preventDefault();

    const value = trim(event.target.value);

    this.setState({
      value,
      isOpen: !!value,
      formatted: this.getFormattedItems(value),
    });
  }

  handleClickItem(item, event) {
    event.preventDefault();

    const value = isObject(item) ? item.label : item;

    this.setState({
      value,
      isOpen: false,
      formatted: this.getFormattedItems(value),
    }, () => this.props.onSelect(item));
  }

  renderItem(item, index) {
    const { renderItem, itemClassName } = this.props;

    let renderedItem = null;

    if (renderItem) {
      renderedItem = React.cloneElement(renderItem(item), { ...item });
    } else if (isString(item)) {
      renderedItem = item;
    } else if (isObject(item) && item.label) {
      renderedItem = item.label;
    } else {
      console.warn(`Item ${item} is incorrect, InputSearch works with string and object(value, label)`);

      return false;
    }

    const classes = cx(styles.Item, itemClassName);

    return (
      <div
        className={classes}
        key={`search-item-${index}`}
        onClick={this.handleClickItem.bind(this, item)}
      >
        {renderedItem}
      </div>
    );
  }

  renderItems() {
    const { emptyResult, itemClassName } = this.props;
    const { formatted } = this.state;

    const renderedItems = formatted.map((item, index) => this.renderItem(item, index));

    return (
      <div className={cx('ItemsList')}>
        {renderedItems}
        {
          emptyResult &&
          !formatted.length &&
          <div className={cx('Item', itemClassName)} key={`search-item-${formatted.length}`}>
            {emptyResult}
          </div>
        }
      </div>
    );
  }

  renderBox() {
    const { isOpen } = this.state;

    if (!isOpen) return null;

    const renderedItems = this.renderItems();

    return (
      <div className={styles.Box}>
        {renderedItems}
      </div>
    );
  }

  render() {
    const {
      list,
      onChange,
      renderItem,
      emptyResult,
      itemClassName,
      className,
      onSelect,
      ...otherProps
    } = this.props;

    const renderedBox = this.renderBox();

    return (
      <div className={cx('InputSearch')}>
        <InputText
          value={this.state.value}
          onChange={this.handleChange}
          {...otherProps}
        />
        {renderedBox}
      </div>
    );
  }
}

InputSearch.displayName = 'InputSearch';

InputSearch.propTypes = {
  ...InputText.propTypes,
  list: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  emptyResult: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  renderItem: PropTypes.func,
  onSelect: PropTypes.func,
};

InputSearch.defaultProps = {
  list: [],
  onSelect: Function.prototype,
  renderItem: undefined,
  emptyResult: undefined,
  className: '',
  itemClassName: '',
};

export default InputSearch;
