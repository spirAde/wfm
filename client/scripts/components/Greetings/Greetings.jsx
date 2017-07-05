import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';

import { Button, Checkbox, Hint, TextLink } from '../UI';

import styles from './Greetings.css';

import imageNotebook from '../../../images/welcome-notebook.png';
import imageQuoteLeft from '../../../images/quote-left.svg';
import imageQuoteRight from '../../../images/quote-right.svg';

const cx = classNames.bind(styles);

class Greetings extends Component {
  render() {
    const { onClickAccept } = this.props;

    return (
      <div className={cx('Greetings')}>
        <section className={cx('AmandaQuote')}>
          <div className={cx('Photo')} />
          <div className={cx('Description')}>
            <blockquote>
              <img src={imageQuoteLeft} role="presentation" />
              Welcome to WorthFM.<br />
              You know your worth, now let’s grow your worth.
              <img src={imageQuoteRight} role="presentation" />
            </blockquote>
            <div className={cx('Author')}>— Amanda Steinberg, Founder & CEO</div>
          </div>
        </section>
        <section className={cx('Screenshot')}>
          <img src={imageNotebook} role="presentation" />
        </section>
        <section className={cx('Features')}>
          <article>
            <h3>
              Three accounts for a big-picture perspective.
              <Hint className={cx('Hint')}>
                <b>Why 3?</b>&nbsp;
                Your financial big picture is about how well you distribute your money across
                liquid savings, mid-range investments, and retirement so you can secure your
                future without sacrificing now.
              </Hint>
            </h3>
            <p>
              WorthFM includes Savings, Investing and Retirement accounts.
              Your Retirement account is set up as a.&nbsp;
              <TextLink text="Want a  instead?" />
            </p>
          </article>
          <article>
            <h3>
              Grow your knowledge and investments.
              <Hint className={cx('Hint')}>
                Financial prosperity takes more than portfolio performance. Learn about your
                investments as they grow through your WorthFM dashboard.
              </Hint>
            </h3>
          </article>
          <article>
            <h3>
              Get started with $50. We charge 0.5% annually to manage your assets.
              Savings will always be free.
              <Hint className={cx('Hint')}>
                <p><b>Our fees are simple and clear.</b></p>

                <p>
                  WorthFM charges 0.5% annually on your investment
                  and retirements accounts, billed monthly.
                </p>

                <p>Your Savings account will always be free</p>
              </Hint>
            </h3>
            <p className={cx('HintMobile')}>
              Your Savings account will always be free
            </p>
          </article>
        </section>
        <section className={cx('LetsGo')}>
          <h2>Ready? Let’s get started!</h2>
          <div>
            <Checkbox name="accept" className={cx('Checkbox')} onChange={onClickAccept}>
              I accept the&nbsp;
              <TextLink
                className={cx('Label')}
                target="_blank"
                to="/terms/client-investment-advisory-agreement"
                text="WorthFM Client Agreement"
              />,&nbsp;
              <TextLink
                className={cx('Label')}
                target="_blank"
                to="/terms/terms-of-use"
                text="Terms of Use"
              />, and&nbsp;
              <TextLink
                className={cx('Label')}
                target="_blank"
                to="/terms/fees"
                text="Fees"
              />;
              I confirm that I am a US citizen;
              I am not employed by a broker dealer;
              I am not a 10% shareholder or director of a publicly traded company;
              I am not a senior political figure.
            </Checkbox>
          </div>
          <div className={cx('GoGoGo')}>
            <Button label="Start" icon="arrow-right" iconAlign="right" isDisabled />
          </div>
          <div className={cx('Happened')}>
            <span>Can’t accept the Terms of Use? <TextLink to="/feedback" text="Tell us why" />.</span>
          </div>
        </section>
      </div>
    );
  }
}

Greetings.displayName = 'Greetings';

Greetings.propTypes = {
  onClickAccept: PropTypes.func,
};

Greetings.defaultProps = {
  onClickAccept: Function.prototype,
};

export default Greetings;
