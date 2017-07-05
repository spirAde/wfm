import React from 'react';
import { storiesOf } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Heading } from '../components/UI';

storiesOf('Heading', module)
  .addDecorator(CenterDecorator)
  .add('just text', () => (
    <Heading
      text="Smth text"
    />
  ))
  .add('long text', () => (
    <Heading
      text="WE COULD NOT ADD REQUESTED FUNDS TO YOUR ACCOUNT WE COULD NOT ADD REQUESTED FUNDS TO YOUR ACCOUNT WE COULD NOT ADD REQUESTED FUNDS TO YOUR ACCOUNT"
    />
  ))
  .add('with line', () => (
    <Heading
      text="Smth text"
      withLine
    />
  ));