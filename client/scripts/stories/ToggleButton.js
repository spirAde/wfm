import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { ToggleButton } from '../components/UI';

const options = [
  {
    value: '$',
    label: '$',
  },
  {
    value: '€',
    label: '€',
  },
  {
    value: '£',
    label: '£',
  },
];

storiesOf('ToggleButton', module)
  .addDecorator(CenterDecorator)
  .add('with data and selected value', () => (
    <ToggleButton
      options={options}
      selectedValue="£"
    />
  ))
  .add('with data and without selected value', () => (
    <ToggleButton
      options={options}
    />
  ))
  .add('with action', () => (
    <ToggleButton
      options={options}
      selectedValue="£"
      onClick={action('click')}
    />
  ));