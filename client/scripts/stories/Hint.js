import React from 'react';
import { storiesOf } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { Hint } from '../components/UI';

storiesOf('Hint', module)
  .addDecorator(CenterDecorator)
  .add('simple hint', () => (
    <div style={{ marginTop: 50 }}>
      <Hint>
        Financial prosperity takes more than portfolio performance.
        Learn about your investments as they grow through your WorthFM dashboard.
      </Hint>
    </div>
  ));