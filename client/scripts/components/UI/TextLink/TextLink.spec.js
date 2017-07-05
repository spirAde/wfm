import React from 'react';

import TextLink from './TextLink';

describe('TextLink', () => {
  it('should render', () => {
    const wrapper = shallow(
      <TextLink />,
    );

    expect(wrapper).not.toBeNull();
  });
});
