import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Button, Tooltip } from '../components/UI';

class TooltipExample1 extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { show } = this.state;

    return this.setState({ show: !show });
  }

  render() {
    return (
      <div ref={(container) => { this.container = container; }}>
        <Button label="Click" onClick={this.handleToggle} buttonRef={(ref) => { this.target = ref; }} />
        <p>
          keep clicking to see the overlay placement change
        </p>

        <Tooltip
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          placement="right"
          container={this.container}
          target={this.target}
        >
          Tooltip Example
        </Tooltip>
      </div>
    );
  }
}

storiesOf('Tooltip', module)
  .addDecorator(CenterDecorator)
  .add('simple tooltip', () => (
    <div style={{ marginTop: 100 }}>
      <TooltipExample1 />
    </div>
  ));
