import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import loadSprite from '../utils/sprite';

import { Button } from '../components/UI';

const __svg__ = { path: '../../images/icons/*.svg', name: '[hash].logos.svg' };
loadSprite(__svg__);

storiesOf('Button', module)
  .addDecorator(CenterDecorator)
  .add('primary with text', () => (
    <Button
      label="Sign In"
    />
  ))
  .add('primary with right icon', () => (
    <Button
      label="Sign In"
      icon="arrow-right"
      iconAlign="right"
    />
  ))
  .add('primary with left icon', () => (
    <Button
      label="Sign In"
      icon="arrow-left"
      iconAlign="left"
    />
  ))
  .add('primary disabled', () => (
    <Button
      label="Sign In"
      icon="arrow-right"
      iconAlign="right"
      isDisabled
    />
  ))
  .add('primary loading', () => (
    <Button
      label="Sign In"
      icon="arrow-right"
      iconAlign="right"
      isLoading
    />
  ))
  .add('primary onClick action', () => (
    <Button
      label="Sign In"
      onClick={action('click event')}
    />
  ))
  .add('secondary with text', () => (
    <Button
      label="Sign In"
      kind="secondary"
    />
  ))
  .add('secondary with right icon', () => (
    <Button
      kind="secondary"
      label="Sign In"
      icon="arrow-right"
      iconAlign="right"
    />
  ))
  .add('secondary with left icon', () => (
    <Button
      kind="secondary"
      label="Sign In"
      icon="arrow-left"
      iconAlign="left"
    />
  ))
  .add('secondary disabled', () => (
    <Button
      kind="secondary"
      label="Sign In"
      icon="arrow-right"
      iconAlign="right"
      isDisabled
    />
  ))
  .add('link', () => (
    <Button
      kind="link"
      icon="arrow-left"
      iconAlign="left"
      label="Sign In"
      onClick={action('click')}
    />
  ));
