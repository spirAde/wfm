import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Checkbox } from '../components/UI';

storiesOf('Checkbox', module)
  .addDecorator(CenterDecorator)
  .add('default', () => (
    <Checkbox name="foo" label="bar" />
  ))
  .add('with onChange', () => (
    <Checkbox name="example" label="Example" onChange={action('handle change')} />
  ))
  .add('defaultChecked', () => (
    <Checkbox name="bar" label="Example" onChange={action('handle change')} defaultChecked />
  ))
  .add('with children', () => (
    <Checkbox name="random">
      Children?
    </Checkbox>
  ))
  .add('just checked', () => (
    <Checkbox name="checked" label="Fixed checked" checked />
  ));

