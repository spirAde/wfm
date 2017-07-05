import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import { Heading } from '../../components/UI';
import EmploymentInformationForm from '../../components/EmploymentInformationForm/EmploymentInformationForm';

import { changeStep, allowNewStep, saveFormValues } from '../../actions/onboarding';

class EmploymentInformationPage extends Component {
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

    dispatch(saveFormValues('employment-information', 'employment'));
    dispatch(changeStep([0, 0]));

    router.push('/newaccount/basicinfo');
  }

  handleClickSubmit(values) {
    console.log(values);

    this.setState({
      isLoading: false,
    }, () => this.nextStep());
  }

  nextStep() {
    const { dispatch, router } = this.props;

    dispatch(saveFormValues('employment-information', 'employment'));

    dispatch(allowNewStep([0, 2]));
    dispatch(changeStep([0, 2]));

    router.push('/survey/risks');
  }

  render() {
    const { isLoading } = this.state;
    const { formValues: { employment: initialValues } } = this.props;

    return (
      <div>
        <Helmet title="Employment" />
        <Heading text="Employment Status" />
        <EmploymentInformationForm
          initialValues={initialValues}
          isLoading={isLoading}
          onSubmit={this.handleClickSubmit}
          onClickBack={this.handleClickBack}
        />
      </div>
    );
  }
}

EmploymentInformationPage.displayName = 'EmploymentInformationPage';

EmploymentInformationPage.propTypes = {
  formValues: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
  router: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

EmploymentInformationPage.defaultProps = {
  formValues: {},
  dispatch: Function.prototype,
};

export default EmploymentInformationPage;
