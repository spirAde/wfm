import React from 'react';

import Radio from './Radio';

describe('Radio', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Radio value="radio" />,
    );

    expect(wrapper).not.toBeNull();
  });
});
