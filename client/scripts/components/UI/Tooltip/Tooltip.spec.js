import React from 'react';

import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Tooltip />,
    );

    expect(wrapper).not.toBeNull();
  });
});
