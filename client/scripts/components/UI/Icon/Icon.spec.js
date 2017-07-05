import React from 'react';

import Icon from './Icon';

describe('Icon', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Icon />,
    );

    expect(wrapper).not.toBeNull();
  });
});
