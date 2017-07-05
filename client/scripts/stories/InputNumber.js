import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { InputNumber } from '../components/UI';

storiesOf('InputNumber', module)
  .addDecorator(CenterDecorator)
  .add('thousandSeparator comma', () => (
    <InputNumber
      thousandSeparator
    />
  ))
  .add('without thousandSeparator', () => (
    <InputNumber
      thousandSeparator={false}
    />
  ))
  .add('decimalSeparator .', () => (
    <InputNumber
      decimalSeparator
    />
  ))
  .add('without decimalSeparator', () => (
    <InputNumber
      decimalSeparator={false}
    />
  ))
  .add('without decimalSeparator and thousandSeparator', () => (
    <InputNumber
      thousandSeparator={false}
      decimalSeparator={false}
    />
  ))
  .add('format phone number pattern XXX-XXX-XXXX', () => (
    <InputNumber
      pattern="phone"
      placeholder="XXX-XXX-XXXX"
    />
  ))
  .add('format date with custom pattern function MM/DD/YYYY', () => (
    <InputNumber
      pattern="date"
      placeholder="MM/DD/YYYY"
    />
  ))
  .add('default value', () => (
    <InputNumber
      value="123123.12"
      thousandSeparator
    />
  ))
  .add('onChange event', () => (
    <InputNumber
      thousandSeparator
      onChange={action('onChange event')}
    />
  ));
