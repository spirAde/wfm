import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import BasicInformationForm from '../../components/BasicInformationForm/BasicInformationForm';
import ModalConductor from '../../components/ModalConductor/ModalConductor';

import { Heading } from '../../components/UI';

import { changeStep, allowNewStep, saveFormValues } from '../../actions/onboarding';

import styles from './BasicInformationPage.css';

const cx = classNames.bind(styles);

class BasicInformationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      showPhoneVerificationModal: false,
    };

    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickSubmitCode = this.handleClickSubmitCode.bind(this);
    this.handleClickHide = this.handleClickHide.bind(this);
    this.handleClickSendAgain = this.handleClickSendAgain.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClickBack(event) {
    event.preventDefault();

    const { router, dispatch } = this.props;

    dispatch(saveFormValues('basic-information', 'basicinfo'));

    router.push('/welcome');
  }

  handleClickSubmit({ firstName, lastName, address, city, state, zipCode, phone, ssn, birthDate }) {
    console.log({ firstName, lastName, address, city, state, zipCode, phone, ssn, birthDate });
    this.setState({
      isLoading: true,
      showPhoneVerificationModal: true,
    });
  }

  handleClickSubmitCode({ code }) {
    console.log('code', code);

    this.setState({
      isLoading: false,
      showPhoneVerificationModal: false,
    }, () => this.nextStep());
  }

  handleClickHide(event) {
    event.preventDefault();

    this.setState({
      isLoading: false,
      showPhoneVerificationModal: false,
    }, () => this.nextStep());
  }

  handleClickSendAgain(event) {
    event.preventDefault();
    console.log('send again');
  }

  nextStep() {
    const { dispatch, router } = this.props;

    dispatch(saveFormValues('basic-information', 'basicinfo'));

    dispatch(allowNewStep([0, 1]));
    dispatch(changeStep([0, 1]));

    router.push('/survey/employment');
  }

  render() {
    const { isLoading, showPhoneVerificationModal } = this.state;
    const { formValues: { basicinfo: initialValues } } = this.props;

    return (
      <div className={cx('BasicInformationPage')}>
        <Helmet title="Tell Us About You" />
        <Heading text="About you: Basic Information" />
        <BasicInformationForm
          isLoading={isLoading}
          initialValues={initialValues}
          onSubmit={this.handleClickSubmit}
          onClickBack={this.handleClickBack}
        />
        <ModalConductor
          component="PhoneVerificationForm"
          show={showPhoneVerificationModal}
          onHide={this.handleClickHide}
          onSubmit={this.handleClickSubmitCode}
          onClickSendAgain={this.handleClickSendAgain}
        />
      </div>
    );
  }
}

BasicInformationPage.displayName = 'BasicInformationPage';

BasicInformationPage.propTypes = {
  formValues: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
  router: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

BasicInformationPage.defaultProps = {
  formValues: {},
  dispatch: Function.prototype,
};

export default BasicInformationPage;
