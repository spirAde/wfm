import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { InputNumber, Radio, RadioGroup } from '../components/UI';

storiesOf('RadioGroup', module)
  .addDecorator(CenterDecorator)
  .add('default', () => (
    <RadioGroup name="values-1">
      <Radio value="value1" label="Label 1" />
      <Radio value="value2" label="Label 2" />
      <Radio value="value3" label="Label 3" />
    </RadioGroup>
  ))
  .add('row align', () => (
    <RadioGroup align="row" name="values-2">
      <Radio value="value1" label="Label 1" />
      <Radio value="value2" label="Label 2" />
      <Radio value="value3" label="Label 3" />
    </RadioGroup>
  ))
  .add('onChange', () => (
    <RadioGroup align="row" onChange={action('handle change')} name="values-3">
      <Radio value="value1" label="Label 1" />
      <Radio value="value2" label="Label 2" />
      <Radio value="value3" label="Label 3" />
    </RadioGroup>
  ))
  .add('custom components', () => (
    <RadioGroup align="row" onChange={action('handle change')} name="values-4">
      <Radio value="value1" label="$50" transform="5%" style={{ marginBottom: 10 }} />
      <Radio value="value2" label="$100" transform="5%" style={{ marginBottom: 10 }} />
      <Radio value="value3" transform="30%" style={{ marginBottom: 10 }} >
        <InputNumber
          withStaticDecimals
          symbol="$"
          onChange={action('handle input change')}
        />
      </Radio>
    </RadioGroup>
  ));

