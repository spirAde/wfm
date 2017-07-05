import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import { Heading } from '../../components/UI';
import CheckInformationForm from '../../components/CheckInformationForm/CheckInformationForm';

import { changeStep, allowNewStep, saveFormValues } from '../../actions/onboarding';

import checkExampleImage from '../../../images/routing-number.png';

class CheckInformationPage extends Component {
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

    dispatch(saveFormValues('check-information', 'check'));
    dispatch(changeStep([1, 0]));

    router.push('/survey/banks');
  }

  handleClickSubmit({ bankName, typeOfAccount, transitRouting, bankAccount, amountOfTransaction }) {
    console.log({ bankName, typeOfAccount, transitRouting, bankAccount, amountOfTransaction });

    this.setState({
      isLoading: true,
    }, () => this.nextStep());
  }

  nextStep() {
    const { dispatch, router } = this.props;

    dispatch(saveFormValues('check-information', 'check'));

    dispatch(allowNewStep([2, 0]));
    dispatch(changeStep([2, 0]));

    router.push('/survey/docusign');
  }

  render() {
    const { isLoading } = this.state;
    const { formValues: { check: initialValues } } = this.props;

    return (
      <div>
        <Helmet title="Banking Information" />
        <Heading text="Fund your account: Enter your bank information" />
        <p>
          <b>
            You can find the information you need on your checks.
          </b>
        </p>
        <img src={checkExampleImage} alt="" style={{ maxWidth: '100%' }} />
        <CheckInformationForm
          onClickBack={this.handleClickBack}
          onSubmit={this.handleClickSubmit}
          initialValues={initialValues}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

CheckInformationPage.displayName = 'CheckInformationPage';

CheckInformationPage.propTypes = {
  formValues: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
  router: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

CheckInformationPage.defaultProps = {
  formValues: {},
  dispatch: Function.prototype,
};

export default CheckInformationPage;
