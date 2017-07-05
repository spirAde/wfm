import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import plaidHandler from '../../utils/plaidHandler';

import { Heading, Label, Button } from '../../components/UI';
import BanksList from '../../components/BanksList/BanksList';

import { changeStep, allowNewStep } from '../../actions/onboarding';

import styles from './ConnectBankPage.css';

const banks = [
  { type: 'bofa', name: 'Bank of America', id: '5301a93ac140de84910000e0' },
  { type: 'bbt', name: 'BB&T', id: '5301a93ac140de84910000cf' },
  { type: 'chase', name: 'Chase', id: '5301a99504977c52b60000d0' },
  { type: 'wells', name: 'Wells Fargo', id: '5301aa096b3f822b440001cb' },
  { type: 'citi', name: 'Citi', id: '5301aa306b3f82a00500018b' },
  { type: 'us', name: 'US Bank', id: '531ea6327de8211c80000440' },
  { type: 'usaa', name: 'USAA', id: '531ea6602ad939b68700047c' },
  { type: 'capone360', name: 'Capital One 360', id: '53c5c8631f9bda09c7000222' },
  { type: 'capone', name: 'Capital One', id: 'capone' },
  { type: 'schwab', name: 'Charles Schwab', id: '53b34fab1a73941962000186' },
  { type: 'fidelity', name: 'Fidelity', id: '53cee1d8c003c2747b000051' },
  { type: 'pnc', name: 'PNC', id: '54acb2eb9d5b8617e0d5aa86' },
  { type: 'td', name: 'TD Bank', id: '55ccd367d32f2fdf19c1c448' },
  { type: 'nfcu', name: 'Navy Federal Credit Union', id: '55f071ac7a1c8e1bd752e54e' },
  { type: 'suntrust', name: 'SunTrust', id: '55fa106813c81cf103e9e093' },
];

const visibleBanks = ['capone360', 'bofa', 'chase', 'citi', 'suntrust', 'td', 'us', 'wells'];

const cx = classNames.bind(styles);

class ConnectBankPage extends Component {
  constructor(props) {
    super(props);

    this.handleClickBanking = this.handleClickBanking.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handlePlaidSuccess = this.handlePlaidSuccess.bind(this);
    this.handlePlaidExit = this.handlePlaidExit.bind(this);
    this.handleSelectBank = this.handleSelectBank.bind(this);
  }

  componentDidMount() {
    if (__CLIENT__) {
      this.linkHandler = plaidHandler({
        onSuccess: this.handlePlaidSuccess,
        onExit: this.handlePlaidExit,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    this.linkHandler.exit();
  }

  handleClickBack(event) {
    event.preventDefault();

    const { router, dispatch } = this.props;

    dispatch(changeStep([0, 2]));

    router.push('/survey/risks');
  }

  handleClickBanking(event) {
    event.preventDefault();

    const { router, dispatch } = this.props;

    dispatch(allowNewStep([1, 1]));
    dispatch(changeStep([1, 1]));

    router.push('/survey/check');
  }

  handleSelectBank(bank) {
    this.linkHandler.open(bank.type);
  }

  handlePlaidSuccess(plaidToken, metaData) {
    console.log(plaidToken);
    console.log(metaData);

    const { router, dispatch } = this.props;

    dispatch(allowNewStep([1, 2]));
    dispatch(changeStep([1, 2]));

    router.push('/survey/accounts');
  }

  handlePlaidExit(error) {
    console.log(error);
  }

  render() {
    return (
      <div className={cx('ConnectBankPage')}>
        <Helmet title="Connect Your Bank" />
        <Heading text="Fund account: Link your bank" />
        <p>
          <b>
            Choose the bank you want to link to your WorthFM account.<br />
            (You can link additional banks from your WorthFM dashboard)
          </b>
        </p>
        <p>
          Popular banks:
        </p>
        <BanksList
          banks={banks}
          visibleBanks={visibleBanks}
          onSelectBank={this.handleSelectBank}
        />
        <div className={cx('SecurityText')}>
          <p>
            WorthFM uses bank-level security measures to protect your personal
            information. Your password and other sensitive data is encrypted,
            and all data is protected in transit using SSL and 128-bit encryption.
          </p>
          <p>
            We do not store your online banking credentials or your social security number,
            and never will.
          </p>
        </div>
        <div className={cx('Row')}>
          <Label text="Other ways to fund your account:" />
        </div>
        <div className={cx('Row')} style={{ margin: 0 }}>
          <Button
            kind="link"
            icon="arrow-right"
            iconAlign="right"
            label="Banking information"
            onClick={this.handleClickBanking}
          />
        </div>
        <div className={cx('Row')}>
          <Button
            kind="link"
            icon="arrow-left"
            iconAlign="left"
            label="Go back"
            onClick={this.handleClickBack}
          />
        </div>
      </div>
    );
  }
}

ConnectBankPage.displayName = 'ConnectBankPage';

ConnectBankPage.propTypes = {
  dispatch: PropTypes.func,
  router: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

ConnectBankPage.defaultProps = {
  dispatch: Function.prototype,
};

export default ConnectBankPage;
