import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { InputCurrency } from '../components/UI';

storiesOf('InputCurrency', module)
  .addDecorator(CenterDecorator)
  .add('currency with static cents', () => (
    <InputCurrency
      symbol=""
      staticCents
    />
  ))
  .add('with symbol and cents', () => (
    <InputCurrency
      staticCents={false}
    />
  ))
  .add('with symbol and static cents', () => (
    <InputCurrency
      staticCents
    />
  ))
  .add('default value', () => (
    <InputCurrency
      value="123123.12"
    />
  ));
