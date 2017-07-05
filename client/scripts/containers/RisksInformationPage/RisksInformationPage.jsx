import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import { Heading } from '../../components/UI';
import RisksInformationForm from '../../components/RisksInformationForm/RisksInformationForm';

import styles from './RisksInformationPage.css';

import { changeStep, allowNewStep, saveFormValues } from '../../actions/onboarding';

import ArrowDownImage from '../../../images/ico-down.png';
import ArrowUpImage from '../../../images/ico-up.png';

const cx = classNames.bind(styles);

class RisksInformationPage extends Component {
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

    dispatch(saveFormValues('risks-information', 'risks'));
    dispatch(changeStep([0, 1]));

    router.push('/survey/employment');
  }

  handleClickSubmit({ risk }) {
    console.log({ risk });

    this.setState({
      isLoading: false,
    }, () => this.nextStep());
  }

  nextStep() {
    const { dispatch, router } = this.props;

    dispatch(saveFormValues('risks-information', 'risks'));

    dispatch(allowNewStep([1, 0]));
    dispatch(changeStep([1, 0]));

    router.push('/survey/banks');
  }

  render() {
    const { isLoading } = this.state;
    const { formValues: { risks: initialValues } } = this.props;

    return (
      <div className={cx('RisksInformationPage')}>
        <Helmet title="Set Up an Account" />
        <Heading text="About you: risk tolerance" />
        <p>
          <b>
            The markets continually move up and down.
            Your comfort level with these changes helps determine the right investments for you.
          </b>
        </p>
        <div className={cx('Information')}>
          <div className={cx('LeftColumn')}>
            <div className={cx('IconField')}>
              <img src={ArrowDownImage} alt="" />
            </div>
            <p>
              In 2008 the US stock market lost 37% of its value*.
              Think of this this way: If you had $10,000 invested,
              your balance would drop to $6,300.
            </p>
          </div>
          <div className={cx('RightColumn')}>
            <div className={cx('IconField')}>
              <img src={ArrowUpImage} alt="" />
            </div>
            <p>
              The good news is that the markets recovered,
              and by 2015 they had rebounded to over 200% of 2009’s low point**.
            </p>
          </div>
        </div>
        <p>
          <b>
            If the same events happened again, what would you do?
          </b>
        </p>
        <RisksInformationForm
          onSubmit={this.handleClickSubmit}
          onClickBack={this.handleClickBack}
          isLoading={isLoading}
          initialValues={initialValues}
        />
        <p className={cx('SP500Index')}>
          *As measured by the S&P 500 Index.
          <br />
          <a
            href="https://am.jpmorgan.com/us/en/asset-management/gim/adv/insights/guide-to-the-markets/viewer"
            target="_blank"
            rel="noopener noreferrer"
          >
            **J.P. Morgan Asset Management Guide to the Markets (Q1 2016, as of 12/31/2015)
          </a>
        </p>
      </div>
    );
  }
}

RisksInformationPage.displayName = 'RisksInformationPage';

RisksInformationPage.propTypes = {
  formValues: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func,
  router: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

RisksInformationPage.defaultProps = {
  formValues: {},
  dispatch: Function.prototype,
};

export default RisksInformationPage;
