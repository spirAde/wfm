import React, { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Button, Field, Modal, Heading } from '../components/UI';

import loadSprite from '../utils/sprite';

const __svg__ = { path: '../../images/icons/*.svg', name: '[hash].logos.svg' };
loadSprite(__svg__);

const options = [
  {
    value: 'employed',
    label: 'Employed',
  },
  {
    value: 'selfEmployed',
    label: 'Self-employed',
  },
  {
    value: 'notCurrentlyWorking',
    label: 'Not Currently Working',
  },
  {
    value: 'student',
    label: 'Student',
  },
  {
    value: 'retired',
    label: 'Retired',
  },
];

class ExampleModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.handleClickShow = this.handleClickShow.bind(this);
    this.handleClickHideModal = this.handleClickHideModal.bind(this);
  }

  handleClickShow(event) {
    event.preventDefault();

    this.setState({ show: true });
  }

  handleClickHideModal(event) {
    event.preventDefault();

    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;

    return (
      <div>
        <Button label="Show Modal" onClick={this.handleClickShow} />
        <Modal
          show={show}
          isClosable
          onHide={this.handleClickHideModal}
        >
          <Heading text="Heading" />
          <Field label="Label" type="select" options={options} placeholder="Select type" />
          <Button label="Click" />
        </Modal>
      </div>
    );
  }
}

storiesOf('Modal', module)
  .addDecorator(CenterDecorator)
  .add('simple modal', () => (
    <Modal
      show
      isClosable={false}
    >
      <Heading text="Heading" />
      <Field label="Label" type="password" />
      <Button label="Click" />
    </Modal>
  ))
  .add('closable modal', () => (
    <ExampleModal />
  ));
