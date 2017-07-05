import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { InputText } from '../components/UI';

import loadSprite from '../utils/sprite';

const __svg__ = { path: '../../images/icons/*.svg', name: '[hash].logos.svg' };
loadSprite(__svg__);

storiesOf('InputText', module)
  .addDecorator(CenterDecorator)
  .add('align row', () => (
    <InputText
      label="Smth Label"
      align="row"
    />
  ))
  .add('icon left', () => (
    <InputText
      label="Smth Label"
      icon="ok"
    />
  ))
  .add('icon right', () => (
    <InputText
      label="Smth Label"
      iconAlign="right"
      icon="calendar"
    />
  ))
  .add('onChange', () => (
    <InputText
      label="Smth Label"
      onChange={action('change event')}
    />
  ));
