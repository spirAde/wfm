import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import shallowCompare from 'react-addons-shallow-compare';

import max from 'lodash/max';
import findKey from 'lodash/findKey';
import find from 'lodash/find';
import keys from 'lodash/keys';
import values from 'lodash/values';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';
import last from 'lodash/last';

import { match } from '../../utils/match';

import { Section, TextLink } from '../UI';

import { Characteristic, Description, Might, Recommendation, ThinkOrSay } from './Content';

import styles from './MoneyTypeReport.css';

import imageVisionary from '../../../images/visionary.svg';
import imageProducer from '../../../images/producer.svg';
import imageNurturer from '../../../images/nurturer.svg';
import imageEpicure from '../../../images/epicure.svg';
import imageIndependent from '../../../images/independent.svg';

import imageSmallVisionary from '../../../images/visionary-small.svg';
import imageSmallProducer from '../../../images/producer-small.svg';
import imageSmallNurturer from '../../../images/nurturer-small.svg';
import imageSmallEpicure from '../../../images/epicure-small.svg';
import imageSmallIndependent from '../../../images/independent-small.svg';

const cx = classNames.bind(styles);

const IMAGES = {
  visionary: imageVisionary,
  producer: imageProducer,
  nurturer: imageNurturer,
  epicure: imageEpicure,
  independent: imageIndependent,
};

const IMAGES_SMALL = {
  visionary: imageSmallVisionary,
  producer: imageSmallProducer,
  nurturer: imageSmallNurturer,
  epicure: imageSmallEpicure,
  independent: imageSmallIndependent,
};

const CIRCLE_RADIUS = 34;

class MoneyTypeReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeType: this.findDefaultActiveType(),
      toggle: {
        showMoreCharacteristics: false,
        showMoreMightThinkOrSay: false,
        showMoreMight: false,
        showMoreRecommendation: false,
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  findDefaultActiveType() {
    const { stats } = this.props;

    const maxStat = max(values(stats));

    // set strict order of keys, because findKey get first key
    const orderedStats = {
      visionary: stats.visionary,
      producer: stats.producer,
      nurturer: stats.nurturer,
      epicure: stats.epicure,
      independent: stats.independent,
    };

    return findKey(orderedStats, stat => stat === maxStat);
  }

  handleChangeActiveArchetype(type, event) {
    event.preventDefault();

    this.setState({
      activeType: type,
      toggle: {
        showMoreCharacteristics: false,
        showMoreMightThinkOrSay: false,
        showMoreMight: false,
        showMoreRecommendation: false,
      },
    });
  }

  renderCircle(type) {
    const { stats } = this.props;

    const image = IMAGES[type];
    const stat = stats[type];

    const strokeDasharray = 2 * Math.PI * CIRCLE_RADIUS * stat / 100;

    return (
      <svg width="100" height="100">
        <defs>
          <clipPath id="circleView">
            <circle cx="50" cy="50" r="30" fill="#FFFFFF" />
          </clipPath>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke="#ffc705"
          strokeWidth={strokeDasharray ? 10 : 0} // safari bug if stat equals zero
          strokeDasharray={`${strokeDasharray}, 1000`}
          transform="rotate(-90, 50, 50)"
        />
        <image
          x="20"
          y="20"
          width="60"
          height="60"
          xlinkHref={image} clipPath="url(#circleView)"
        />
      </svg>
    );
  }

  renderArchetypes() {
    const { activeType } = this.state;
    const { content, stats } = this.props;

    return content.map((item) => {
      const { type } = item;

      const isActive = activeType === type;

      const stat = stats[type];
      const renderedCircle = this.renderCircle(type);

      const classes = cx('Archetype', capitalize(type), {
        Active: isActive,
      });

      return (
        <a
          className={classes}
          onClick={this.handleChangeActiveArchetype.bind(this, type)}
          key={`mnt-archetype-${type}`}
        >
          {capitalize(type)}
          {renderedCircle}
          <br />
          <span className={cx('Percent')}>{stat}%</span>
        </a>
      );
    });
  }

  renderContent() {
    const { activeType, toggle: {
      showMoreCharacteristics,
      showMoreMightThinkOrSay,
      showMoreMight,
      showMoreRecommendation,
    } } = this.state;

    const { content } = this.props;

    const activeArchetype = find(content, item => item.type === activeType) || {};
    const lastKey = last(keys(activeArchetype.content));

    const renderedComponents = map(activeArchetype.content, (contentItem, key) => {
      const sectionBorder = key === lastKey
        ? { border: 'bottom', borderColor: 'yellow', borderWidth: 'fat' }
        : { border: 'bottom', borderColor: 'grey', borderWidth: 'basic' };

      return match(key, {
        money_type_description: (
          <Section
            zeroPadding
            key={`mnt-${activeType}-description`}
          >
            <Description
              imageSrc={IMAGES_SMALL[activeType]}
              type={activeType}
              content={contentItem[0]}
            />
          </Section>
        ),
        money_type_characteristics: (
          <Section
            key={`mnt-${activeType}-characteristics`}
            {...sectionBorder}
          >
            <Characteristic
              imageSrc={IMAGES_SMALL[activeType]}
              type={activeType}
              isOpen={showMoreCharacteristics}
              content={contentItem}
            />
          </Section>
        ),
        money_type_might: (
          <Section
            key={`mnt-${activeType}-might`}
            {...sectionBorder}
          >
            <Might
              imageSrc={IMAGES_SMALL[activeType]}
              type={activeType}
              isOpen={showMoreMight}
              content={contentItem}
            />
          </Section>
        ),
        money_type_think_or_say: (
          <Section
            key={`mnt-${activeType}-think-or-say`}
            {...sectionBorder}
          >
            <ThinkOrSay
              imageSrc={IMAGES_SMALL[activeType]}
              type={activeType}
              isOpen={showMoreMightThinkOrSay}
              content={contentItem}
            />
          </Section>
        ),
        money_type_recommendation: (
          <Section
            key={`mnt-${activeType}-recommendation`}
            {...sectionBorder}
          >
            <Recommendation
              imageSrc={IMAGES_SMALL[activeType]}
              type={activeType}
              isOpen={showMoreRecommendation}
              content={contentItem}
            />
          </Section>
        ),
      });
    });

    return (
      <div>
        {renderedComponents}
      </div>
    );
  }

  render() {
    const { onClickRetakeAssessment } = this.props;

    const renderedArchetypes = this.renderArchetypes();
    const renderedContent = this.renderContent();

    return (
      <div className={cx('MoneyTypeReport')}>
        <div className={cx('Archetypes')}>
          {renderedArchetypes}
        </div>
        {renderedContent}
        <Section>
          <h2 className={cx('RetakeTitle')}>Re-take the MoneyType Assessment</h2>
          <p>
            As your priorities change, your MoneyType report will change with it.
            We recommend re-taking the assessment whenever you go through major
            life changes that could affect the way you think about money, such as marriage,
            a big move, a career change, or starting a family. Please note that re-taking
            the assessment will permanently overwrite your existing results.&nbsp;
            <TextLink onClick={onClickRetakeAssessment}>Re-take the assessment</TextLink>
          </p>
        </Section>
      </div>
    );
  }
}

MoneyTypeReport.displayName = 'MoneyTypeReport';

MoneyTypeReport.propTypes = {
  onClickRetakeAssessment: PropTypes.func,
  onChangeShowType: PropTypes.func,
  stats: PropTypes.object,
  content: PropTypes.array,
  showTypes: PropTypes.object,
};

MoneyTypeReport.defaultProps = {
  onClickRetakeAssessment: Function.prototype,
  onChangeShowType: Function.prototype,
  stats: {},
  content: [],
  showTypes: {},
};

export default MoneyTypeReport;
