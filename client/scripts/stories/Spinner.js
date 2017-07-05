import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Spinner } from '../components/UI';

storiesOf('Spinner', module)
  .addDecorator(CenterDecorator)
  .add('size xs', () => (
    <Spinner
      size="xs"
      color="#000000"
    />
  ))
  .add('size s', () => (
    <Spinner
      size="s"
      color="#000000"
    />
  ))
  .add('size m', () => (
    <Spinner
      size="m"
      color="#000000"
    />
  ))
  .add('size l', () => (
    <Spinner
      size="l"
      color="#000000"
    />
  ))
  .add('size xl', () => (
    <Spinner
      size="xl"
      color="#000000"
    />
  ));
