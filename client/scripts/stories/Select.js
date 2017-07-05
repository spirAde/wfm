import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Select } from '../components/UI';

import loadSprite from '../utils/sprite';

const __svg__ = { path: '../../images/icons/*.svg', name: '[hash].logos.svg' };
loadSprite(__svg__);

const options = [
  {
    value: 'employed',
    label: 'Employed',
  },
  {
    value: 'selfEmployed',
    label: 'Self-employed',
  },
  {
    value: 'notCurrentlyWorking',
    label: 'Not Currently Working',
  },
  {
    value: 'student',
    label: 'Student',
  },
  {
    value: 'retired',
    label: 'Retired',
  },
];

storiesOf('Select', module)
  .addDecorator(CenterDecorator)
  .add('selected value', () => (
    <Select
      options={options}
      value="employed"
    />
  ))
  .add('placeholder', () => (
    <Select
      options={options}
      placeholder="Select type"
    />
  ))
  .add('with action', () => (
    <Select
      options={options}
      value="employed"
      onSelect={action('select value')}
    />
  ))
  .add('with disabled options', () => (
    <Select
      options={options}
      disabledOptions={['selfEmployed', 'retired']}
      value="employed"
      onSelect={action('select value')}
    />
  ));