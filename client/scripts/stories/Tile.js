import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Tile, Heading, Button, TextLink } from '../components/UI';

import loadSprite from '../utils/sprite';

const __svg__ = { path: '../../images/icons/*.svg', name: '[hash].logos.svg' };
loadSprite(__svg__);

storiesOf('Tile', module)
  .addDecorator(CenterDecorator)
  .add('default', () => (
    <Tile style={{ width: 614 }}>
      <div>
        Children content
      </div>
    </Tile>
  ))
  .add('isClosable', () => (
    <Tile isClosable style={{ width: 614 }}>
      <div>
        Children content
      </div>
    </Tile>
  ))
  .add('onHide action', () => (
    <Tile
      onHide={action('close hide')}
      isClosable
      style={{ width: 614 }}
    >
      <div>
        Children content
      </div>
    </Tile>
  ))
  .add('with Heading', () => (
    <Tile
      onHide={action('close hide')}
      isClosable
      style={{ width: 614 }}
    >
      <Heading text="Tile Heading" withLine />
      <div>
        Children content
      </div>
    </Tile>
  ))
  .add('basic tile view', () => (
    <Tile
      onHide={action('close hide')}
      isClosable
      style={{ width: 614 }}
    >
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
        <Button
          iconAlign="left"
          icon="arrow-left"
          label="Go back"
          kind="link"
        />
      </div>
    </Tile>
  ))
  .add('with eyebrow', () => (
    <Tile
      onHide={action('close hide')}
      isClosable
      style={{ width: 614 }}
      eyebrow="moneytype"
    >
      <Heading text="Title of Tile" withLine />
      <div>
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet,
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet,
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet,
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet,
        Body copy lorem ipsum dolor sit amet, Body copy lorem ipsum dolor sit amet...
      </div>
    </Tile>
  ));
