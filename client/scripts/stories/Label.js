import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Label } from '../components/UI';

storiesOf('Label', module)
  .addDecorator(CenterDecorator)
  .add('simple label', () => (
    <Label
      text="smth label name"
    />
  ));
