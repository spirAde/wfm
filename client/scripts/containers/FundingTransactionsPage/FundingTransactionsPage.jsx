import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import { connect } from 'react-redux';

import classNames from 'classnames/bind';

import find from 'lodash/find';

import SectionConductor from '../../components/SectionConductor/SectionConductor';
import ModalConductor from '../../components/ModalConductor/ModalConductor';

import { setActiveRecurringGroupId } from '../../actions/recurring';

import FundingTransactionsPageSelectors from '../../selectors/FundingTransactionsPageSelectors';

import styles from './FundingTransactionsPage.css';

const cx = classNames.bind(styles);

class FundingTransactionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editableGroup: null,
      editableTransaction: null,

      showCreatingGroupModal: false,
      showEditingGroupModal: false,
      showEditingItemModal: false,
    };

    this.handleClickCreateGroup = this.handleClickCreateGroup.bind(this);
    this.handleClickEditGroup = this.handleClickEditGroup.bind(this);
    this.handleClickEditItem = this.handleClickEditItem.bind(this);

    this.handleClickHideCreatingGroupModal = this.handleClickHideCreatingGroupModal.bind(this);
    this.handleClickHideEditingGroupModal = this.handleClickHideEditingGroupModal.bind(this);
    this.handleClickHideEditingItemModal = this.handleClickHideEditingItemModal.bind(this);

    this.handleChangeActiveGroup = this.handleChangeActiveGroup.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickCreateGroup(event) {
    event.preventDefault();

    this.setState({
      showCreatingGroupModal: true,
    });
  }

  handleClickEditGroup(groupId) {
    const { groups } = this.props;

    const editableGroup = find(groups, group => group.id === groupId);

    this.setState({
      editableGroup,
      showEditingGroupModal: true,
    });
  }

  handleClickEditItem(groupId, transactionId) {
    const { groups } = this.props;

    const group = find(groups, groupItem => groupItem.id === groupId) || {};
    const transaction = find(
      group.upcoming_transactions,
      transactionItem => transactionItem.id === transactionId,
    );

    this.setState({
      showEditingItemModal: true,
      editableTransaction: transaction,
    });
  }

  handleClickHideCreatingGroupModal() {
    this.setState({
      showCreatingGroupModal: false,
    });
  }

  handleClickHideEditingGroupModal() {
    this.setState({
      showEditingGroupModal: false,
    });
  }

  handleClickHideEditingItemModal() {
    this.setState({
      showEditingItemModal: false,
    });
  }

  handleChangeActiveGroup(groupId) {
    const { dispatch } = this.props;

    return dispatch(setActiveRecurringGroupId(groupId));
  }

  render() {
    const {
      editableGroup,
      editableTransaction,

      showCreatingGroupModal,
      showEditingGroupModal,
      showEditingItemModal,
    } = this.state;

    const { activeGroupId, groups, transactions } = this.props;

    return (
      <div className={cx('FundingTransactionsPage')}>
        <Helmet title="Transactions" />
        <SectionConductor
          border="bottom"
          borderColor="yellow"
          borderWidth="fat"
          component="DashboardBalance"
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          component="RecurringTransactionsList"
          activeGroupId={activeGroupId}
          groups={groups}
          onClickCreateGroup={this.handleClickCreateGroup}
          onClickEditGroup={this.handleClickEditGroup}
          onClickEditItem={this.handleClickEditItem}
          onChangeActiveGroup={this.handleChangeActiveGroup}
        />
        <SectionConductor
          border="bottom"
          borderColor="grey"
          borderWidth="basic"
          transactions={transactions}
          component="TransactionsList"
          isFilterable
        />
        <SectionConductor
          component="Fees"
        />
        <ModalConductor
          show={showCreatingGroupModal}
          component="RecurringCreatingGroupForm"
          onHide={this.handleClickHideCreatingGroupModal}
        />
        <ModalConductor
          show={showEditingGroupModal}
          group={editableGroup}
          component="RecurringEditingGroupForm"
          onHide={this.handleClickHideEditingGroupModal}
        />
        <ModalConductor
          show={showEditingItemModal}
          transaction={editableTransaction}
          component="RecurringEditingItemForm"
          onHide={this.handleClickHideEditingItemModal}
        />
      </div>
    );
  }
}

FundingTransactionsPage.displayName = 'FundingTransactionsPage';

FundingTransactionsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeGroupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  groups: PropTypes.arrayOf(PropTypes.object),
  transactions: PropTypes.arrayOf(PropTypes.object),
};

FundingTransactionsPage.defaultProps = {
  activeGroupId: undefined,
  groups: [],
  transactions: [],
};

export default connect(FundingTransactionsPageSelectors)(FundingTransactionsPage);
