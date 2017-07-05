import React from 'react';
import { action, storiesOf } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Notification, TextLink } from '../components/UI';

storiesOf('Notification', module)
  .addDecorator(CenterDecorator)
  .add('info notification', () => (
    <Notification type="info">
      This is a info message. This is a &nbsp;<TextLink text="link in an info message" />.
    </Notification>
  ))
  .add('success notification', () => (
    <Notification type="success">
      This is a success message. This is a &nbsp;<TextLink text="link in an success message" />.
    </Notification>
  ))
  .add('error notification', () => (
    <Notification type="error">
      This is an error message. This is a &nbsp;<TextLink text="link in an error message" />.
    </Notification>
  ))
  .add('info closable notification', () => (
    <Notification type="info" isClosable onClick={action('click close')} style={{ width: 614 }}>
      This is a notification that can be closed.
    </Notification>
  ));