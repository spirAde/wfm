import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import moment from 'moment';

import CenterDecorator from './decorators/CenterDecorator';

import { InputDatepicker } from '../components/UI';

storiesOf('InputDatepicker', module)
  .addDecorator(CenterDecorator)
  .add('simple', () => (
    <InputDatepicker />
  ))
  .add('with selected date', () => (
    <InputDatepicker
      selected={moment('11/12/2014')}
    />
  ))
  .add('onChange', () => (
    <InputDatepicker
      onChange={action('event handler date')}
    />
  ));

