import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import { Heading } from '../../components/UI';
import AccountsForm from '../../components/AccountsForm/AccountsForm';

import { changeStep, allowNewStep, saveFormValues } from '../../actions/onboarding';

class AccountsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickBack(event) {
    event.preventDefault();

    const { router, dispatch } = this.props;

    dispatch(saveFormValues('accounts', 'accounts'));
    dispatch(changeStep([1, 0]));

    router.push('/survey/banks');
  }

  handleClickSubmit({ plaidAmount, typeOfAccount }) {
    console.log({ plaidAmount, typeOfAccount });

    this.setState({
      isLoading: true,
    }, () => this.nextStep());
  }

  nextStep() {
    const { dispatch, router } = this.props;

    dispatch(saveFormValues('accounts', 'accounts'));

    dispatch(allowNewStep([2, 0]));
    dispatch(changeStep([2, 0]));

    router.push('/survey/docusign');
  }

  render() {
    const { isLoading } = this.state;
    const { formValues: { accounts: initialValues } } = this.props;

    return (
      <div>
        <Helmet title="Accounts" />
        <Heading text="Fund account: Initial Deposit" />
        <p>
          <b>
            Select an account to link to WorthFM for electronic funding and transfers.
          </b>
        </p>
        <AccountsForm
          onSubmit={this.handleClickSubmit}
          onClickBack={this.handleClickBack}
          isLoading={isLoading}
          initialValues={initialValues}
        />
      </div>
    );
  }
}

AccountsPage.displayName = 'AccountsPage';

AccountsPage.propTypes = {
  formValues: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
  router: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

AccountsPage.defaultProps = {
  formValues: {},
  dispatch: Function.prototype,
};

export default AccountsPage;
