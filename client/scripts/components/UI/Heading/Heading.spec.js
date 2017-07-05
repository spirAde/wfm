import React from 'react';

import Heading from './Heading';

describe('Heading', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Heading />,
    );

    expect(wrapper).not.toBeNull();
  });

  it('should render text', () => {
    const text = 'Smth label';

    const wrapper = shallow(
      <Heading text="Smth label" />,
    );

    expect(wrapper.text()).toEqual(text);
  });
});
