import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Section, Heading, Button, TextLink } from '../components/UI';

import loadSprite from '../utils/sprite';

const __svg__ = { path: '../../images/icons/*.svg', name: '[hash].logos.svg' };
loadSprite(__svg__);

storiesOf('Section', module)
  .addDecorator(CenterDecorator)
  .add('basic section view', () => (
    <Section border="bottom" borderColor="yellow" borderWidth="fat">
      <Heading text="Title of Tile" withLine />
      <div>
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet,
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet,
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet,
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet,
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet...
      </div>
      <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          iconAlign="right"
          icon="arrow-right"
          label="Action"
        />
        <TextLink text="This is a text link" />
      </div>
      <div>
        <Button
          iconAlign="left"
          icon="arrow-left"
          label="Go back"
          kind="link"
        />
      </div>
    </Section>
  ));
