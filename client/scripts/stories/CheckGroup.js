import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Checkbox, CheckGroup } from '../components/UI';

storiesOf('CheckGroup', module)
  .addDecorator(CenterDecorator)
  .add('default', () => (
    <CheckGroup>
      <Checkbox name="value1" label="Label 1" />
      <Checkbox name="value2" label="Label 2" />
      <Checkbox name="value3" label="Label 3" />
    </CheckGroup>
  ))
  .add('row align', () => (
    <CheckGroup align="row">
      <Checkbox name="value1" label="Label 1" />
      <Checkbox name="value2" label="Label 2" />
      <Checkbox name="value3" label="Label 3" />
    </CheckGroup>
  ))
  .add('onChange', () => (
    <CheckGroup align="row" onChange={action('handle change')}>
      <Checkbox name="value1" label="Label 1" />
      <Checkbox name="value2" label="Label 2" />
      <Checkbox name="value3" label="Label 3" />
    </CheckGroup>
  ));

