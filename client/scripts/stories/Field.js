import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Field } from '../components/UI';

storiesOf('Field', module)
  .addDecorator(CenterDecorator)
  .add('default type', () => (
    <Field
      label="Email"
      name="email"
    />
  ))
  .add('number type', () => (
    <Field
      label="Number Field"
      name="number"
      type="number"
      thousandSeparator={false}
    />
  ))
  .add('row align', () => (
    <Field
      label="Email"
      name="email"
      align="row"
    />
  ))
  .add('2 fields', () => (
    <div>
      <Field
        label="Email"
        name="email"
      />
      <Field
        label="Password"
        name="pwd"
      />
    </div>
  ))
  .add('2 fields with error', () => (
    <div>
      <Field
        label="Email"
        name="email"
        errorText="Incorrect email, please check again"
      />
      <Field
        label="Password"
        name="pwd"
      />
    </div>
  ));
