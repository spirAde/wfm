import React, { PureComponent } from 'react';

import classNames from 'classnames/bind';

import { Button, Heading, TextLink } from '../UI';

import styles from './ConsentWithChanges.css';

const cx = classNames.bind(styles);

class ConsentWithChanges extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      consentIsAccepted: false,
    };

    this.handleClickAccept = this.handleClickAccept.bind(this);
  }

  handleClickAccept(event) {
    event.preventDefault();

    this.setState({
      consentIsAccepted: true,
    });
  }

  renderForAccepted() {
    return (
      <div>
        Your consent was received. The Change of Control letter and
        ADV2 were previously sent to you for your records.
        If you would like them resent please&nbsp;
        <TextLink>Chat with Client Services</TextLink>.
      </div>
    );
  }

  renderAgreement() {
    return (
      <div>
        <p>
          <b>Your Consent is Required</b>
        </p>
        <p>
          WorthFM is an SEC-registered Investment Adviser.
          From time to time we are required by law to tell you about changes
          made to the business and to obtain your consent.
        </p>
        <p>
          We are making this important change now: Michelle Smith has resigned
          her position as Chairwoman and no longer has a controlling interest in WorthFM.
        </p>
        <p>
          A few important points:
        </p>
        <ul>
          <li>
            <b>
              Your consent is required by December 31, 2016,
              in order to continue as a WorthFM client.
            </b>
          </li>
          <li>
            There will be no changes to your accounts, online experience or fees.
          </li>
          <li>
            Please read our&nbsp;
            <TextLink to="/terms/change-of-control-consent-letter" target="_blank">
              Change of Control letter
            </TextLink>&nbsp;
            and our current&nbsp;
            <TextLink href="/files/brochure.pdf" target="_blank">
              Form ADV 2A - Disclosure Brochure
            </TextLink>&nbsp;
            before consenting and agreeing to these changes.
          </li>
        </ul>
        <p>
          If advisory consent is a new process for you,
          we are here to answer any of your questions.
        </p>
        <Button
          label="I consent and agree to these changes"
          icon="arrow-right"
          iconAlign="right"
          className={cx('Button')}
          labelClassName={cx('Label')}
          iconClassName={cx('Icon')}
          onClick={this.handleClickAccept}
        />
      </div>
    );
  }

  render() {
    const { consentIsAccepted } = this.state;

    const renderedComponent = consentIsAccepted ? this.renderForAccepted() : this.renderAgreement();

    return (
      <div className={cx('ConsentWithChanges')}>
        <Heading text="Changes at WorthFM" />
        {renderedComponent}
      </div>
    );
  }
}

ConsentWithChanges.displayName = 'ConsentWithChanges';

ConsentWithChanges.propTypes = {};

ConsentWithChanges.defaultProps = {};

export default ConsentWithChanges;
