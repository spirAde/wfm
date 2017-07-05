import React from 'react';

import ToggleButton from './ToggleButton';

const options = [
  {
    value: '$',
    label: '$',
  },
  {
    value: '€',
    label: '€',
  },
  {
    value: '£',
    label: '£',
  },
];

describe('ToggleButton', () => {
  it('should render', () => {
    const wrapper = shallow(
      <ToggleButton options={options} />,
    );

    const instance = wrapper.instance();

    expect(instance).toBeInstanceOf(ToggleButton);
  });
});
