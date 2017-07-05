import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import assign from 'lodash/assign';

import { Field, Icon } from '../UI';

import {
  accountOptions,
  transactionStatusOptions,
  fundingTypeOptions,
} from '../../utils/options';

import styles from './TransactionsFilter.css';

const cx = classNames.bind(styles);

const data = {
  transactionStatus: '',
  account: '',
  fundingType: '',
  startDate: undefined,
  endDate: undefined,
};

class TransactionsFilter extends Component {
  constructor(props) {
    super(props);

    this.state = assign({}, data, { isOpen: false });

    this.handleClickOpenFilter = this.handleClickOpenFilter.bind(this);

    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeTransactionStatus = this.handleChangeTransactionStatus.bind(this);
    this.handleChangeAccount = this.handleChangeAccount.bind(this);
    this.handleChangeFundingType = this.handleChangeFundingType.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickOpenFilter(event) {
    event.preventDefault();

    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  handleChangeStartDate(date, event) {
    event.preventDefault();

    this.setState({
      startDate: date,
    }, () => this.props.onChangeFilter(assign({}, this.state, { startDate: date })));
  }

  handleChangeEndDate(date, event) {
    event.preventDefault();

    this.setState({
      endDate: date,
    }, () => this.props.onChangeFilter(assign({}, this.state, { endDate: date })));
  }

  handleChangeTransactionStatus(value) {
    this.setState({
      transactionStatus: value,
    }, () => this.props.onChangeFilter(assign({}, this.state, { transactionStatus: value })));
  }

  handleChangeAccount(value) {
    this.setState({
      account: value,
    }, () => this.props.onChangeFilter(assign({}, this.state, { account: value })));
  }

  handleChangeFundingType(value) {
    this.setState({
      fundingType: value,
    }, () => this.props.onChangeFilter(assign({}, this.state, { fundingType: value })));
  }

  renderFields() {
    const { startDate, endDate } = this.state;

    return (
      <div>
        <div>
          <div className={cx('Row')}>
            <Field
              type="datepicker"
              selected={startDate}
              placeholderText="Select a start date"
              className={cx('Datepicker')}
              onChange={this.handleChangeStartDate}
            />
            <Field
              type="datepicker"
              selected={endDate}
              placeholderText="Select an end date"
              className={cx('Datepicker')}
              onChange={this.handleChangeEndDate}
            />
          </div>
          <div className={cx('Row')}>
            <Field
              type="select"
              placeholder="Status"
              className={cx('Select')}
              options={transactionStatusOptions}
              onChange={this.handleChangeTransactionStatus}
            />
            <Field
              type="select"
              placeholder="Account"
              className={cx('Select')}
              options={[{ value: 'all', label: 'All' }, ...accountOptions]}
              onChange={this.handleChangeAccount}
            />
            <Field
              type="select"
              placeholder="Type"
              className={cx('Select')}
              options={fundingTypeOptions}
              onChange={this.handleChangeFundingType}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isOpen } = this.state;

    const renderedFields = isOpen ? this.renderFields() : null;

    return (
      <div className={cx('TransactionsFilter')}>
        <div className={cx('FilterText')}>
          <Icon
            icon={isOpen ? 'arrow-down' : 'arrow-right'}
            className={cx('Icon')}
            onClick={this.handleClickOpenFilter}
          />
          <p className={cx('Text')}>
            Filter transactions
          </p>
        </div>
        {renderedFields}
      </div>
    );
  }
}

TransactionsFilter.displayName = 'TransactionsFilter';

TransactionsFilter.propTypes = {
  onChangeFilter: PropTypes.func,
};

TransactionsFilter.defaultProps = {
  onChangeFilter: Function.prototype,
};

export default TransactionsFilter;
