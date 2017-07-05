import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import shallowCompare from 'react-addons-shallow-compare';

import classNames from 'classnames/bind';

import MoneyTypePageSelectors from '../../selectors/MoneyTypePageSelectors';

import { Heading, Section } from '../../components/UI';

import SectionConductor from '../../components/SectionConductor/SectionConductor';

import styles from './MoneyType.css';

const cx = classNames.bind(styles);

class MoneyTypePage extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderReport() {
    const { content, stats, showTypes } = this.props;

    return (
      <div>
        <Section
          border="bottom"
          borderColor="yellow"
          borderWidth="fat"
        >
          <Heading className={cx('Title')}>
            <b>Your</b>
            <span> Money
              <span>T</span>
              ype
            </span>
            <b> Report</b>
          </Heading>
          <p>
            Your MoneyType Report gives you insights into how you
            think about and manage money. Everyone is a unique combination of all 5 types.
          </p>
          <p>
            Click each type to read your report, or download a PDF  of the full report.
          </p>
        </Section>
        <SectionConductor
          zeroPadding
          component="MoneyTypeReport"
          content={content}
          stats={stats}
          showTypes={showTypes}
        />
      </div>
    );
  }

  renderAssessmentForm() {
    const { questions } = this.props;

    return (
      <SectionConductor
        zeroPadding
        component="MoneyTypeAssessmentForm"
        questions={questions}
      />
    );
  }

  render() {
    const renderedComponent = this.renderReport();

    return (
      <div className={cx('MoneyType')}>
        <Helmet title="MoneyType" />
        {renderedComponent}
      </div>
    );
  }
}

MoneyTypePage.displayName = 'MoneyTypePage';

MoneyTypePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  content: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  stats: PropTypes.object,
  showTypes: PropTypes.object,
};

MoneyTypePage.defaultProps = {
  stats: {},
  showTypes: {},
  content: [],
};

export default connect(MoneyTypePageSelectors)(MoneyTypePage);
