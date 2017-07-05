import React from 'react';

import RadioGroup from './RadioGroup';
import Radio from '../Radio/Radio';

describe('RadioGroup', () => {
  it('should render', () => {
    const wrapper = shallow(
      <RadioGroup name="sample">
        <Radio value="radio1" />
        <Radio value="radio2" />
      </RadioGroup>,
    );

    expect(wrapper).not.toBeNull();
  });
});
