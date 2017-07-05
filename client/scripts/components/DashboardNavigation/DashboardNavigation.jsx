import React, { PropTypes, Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import menuImg from '../../../images/dash_menu.svg';

import styles from './DashboardNavigation.css';

const cx = classNames.bind(styles);

class DashboardNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: undefined,
    };

    this.handleClickHome = this.handleClickHome.bind(this);
    this.handleClickAccounts = this.handleClickAccounts.bind(this);
    this.handleClickFunding = this.handleClickFunding.bind(this);
    this.handleClickSubMenuItem = this.handleClickSubMenuItem.bind(this);
    this.handleClickOpenMenu = this.handleClickOpenMenu.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickOutside() {
    this.setState({
      isOpen: false,
      currentItem: undefined,
    });
  }

  handleClickHome(event) {
    event.preventDefault();

    this.setState({
      isOpen: false,
      currentItem: undefined,
    }, () => this.props.onChangeLocation('/dashboard'));
  }

  handleClickAccounts(event) {
    event.preventDefault();

    const { currentItem } = this.state;

    this.setState({
      currentItem: currentItem !== 'accounts' ? 'accounts' : undefined,
    });
  }

  handleClickFunding(event) {
    event.preventDefault();

    const { currentItem } = this.state;

    this.setState({
      currentItem: currentItem !== 'funding' ? 'funding' : undefined,
    });
  }

  handleClickSubMenuItem(event) {
    event.preventDefault();

    const { target: { href } } = event;

    this.setState({
      isOpen: false,
      currentItem: undefined,
    }, () => this.props.onChangeLocation(href));
  }

  handleClickOpenMenu(event) {
    event.preventDefault();

    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { currentItem, isOpen } = this.state;
    const { isBurgerMenu } = this.props;

    const accountsIsOpen = currentItem === 'accounts';
    const fundingIsOpen = currentItem === 'funding';

    const listClasses = cx('List', {
      BurgerMenu: isBurgerMenu,
    });

    const accountsItemClasses = cx('Item', {
      Active: accountsIsOpen,
    });

    const fundingItemClasses = cx('Item', {
      Active: fundingIsOpen,
    });

    const showList = isBurgerMenu ? isOpen : true;
    const showHome = !isBurgerMenu || (isBurgerMenu && !accountsIsOpen && !fundingIsOpen);
    const showFavorites = !isBurgerMenu || (isBurgerMenu && !accountsIsOpen && !fundingIsOpen);
    const showAccounts = !isBurgerMenu || (isBurgerMenu && !fundingIsOpen);
    const showFunding = !isBurgerMenu || (isBurgerMenu && !accountsIsOpen);

    return (
      <div className={cx('DashboardNavigation')}>
        {
          isBurgerMenu &&
          <a className={cx('BurgerMenuIcon')} onClick={this.handleClickOpenMenu}>
            <img src={menuImg} />
          </a>
        }
        {
          showList &&
          <ul className={listClasses}>
            {
              showHome &&
              <li className={cx('Item')}>
                <a onClick={this.handleClickHome}>
                  <span className={cx('HomeItem')} />
                  Home
                </a>
              </li>
            }
            {
              showAccounts &&
              <li className={accountsItemClasses}>
                <a onClick={this.handleClickAccounts}>
                  <span className={cx('AccountsItem')} />
                  Accounts
                </a>
                {
                  accountsIsOpen &&
                  <ul className={cx('SubMenu')}>
                    <li>
                      <a href="/accounts/savings" onClick={this.handleClickSubMenuItem}>
                        Savings
                      </a>
                    </li>
                    <li>
                      <a href="/accounts/investment" onClick={this.handleClickSubMenuItem}>
                        Investment
                      </a>
                    </li>
                    <li>
                      <a href="/accounts/retirement" onClick={this.handleClickSubMenuItem}>
                        Retirement
                      </a>
                    </li>
                  </ul>
                }
              </li>
            }
            {
              showFunding &&
              <li className={fundingItemClasses}>
                <a onClick={this.handleClickFunding}>
                  <span className={cx('FundingItem')} />
                  Funding
                </a>
                {
                  fundingIsOpen &&
                  <ul className={cx('SubMenu')}>
                    <li>
                      <a href="/funding/add" onClick={this.handleClickSubMenuItem}>
                        Add funds
                      </a>
                    </li>
                    <li>
                      <a href="/funding/transfer" onClick={this.handleClickSubMenuItem}>
                        Transfer
                      </a>
                    </li>
                    <li>
                      <a href="/funding/withdraw" onClick={this.handleClickSubMenuItem}>
                        Withdraw
                      </a>
                    </li>
                    <li>
                      <a href="/funding/transactions" onClick={this.handleClickSubMenuItem}>
                        Transactions
                      </a>
                    </li>
                  </ul>
                }
              </li>
            }
            {/*{
              showFavorites &&
              <li className={styles.Item}>
                <a>
                  <span className={styles.FavoritesItem} />
                  Favorites
                </a>
              </li>
            }*/}
          </ul>
        }
      </div>
    );
  }
}

DashboardNavigation.displayName = 'DashboardNavigation';

DashboardNavigation.propTypes = {
  isBurgerMenu: PropTypes.bool,
  onChangeLocation: PropTypes.func.isRequired,
};

DashboardNavigation.defaultProps = {
  isBurgerMenu: undefined,
};

export default onClickOutside(DashboardNavigation);
