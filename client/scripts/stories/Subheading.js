import React from 'react';
import { storiesOf } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { SubHeading } from '../components/UI';

storiesOf('SubHeading', module)
  .addDecorator(CenterDecorator)
  .add('just text', () => (
    <SubHeading
      text="Smth text"
    />
  ))
  .add('long text', () => (
    <SubHeading
      text="WE COULD NOT ADD REQUESTED FUNDS TO YOUR ACCOUNT WE COULD NOT ADD REQUESTED FUNDS TO YOUR ACCOUNT WE COULD NOT ADD REQUESTED FUNDS TO YOUR ACCOUNT"
    />
  ));