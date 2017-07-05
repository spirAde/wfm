import React from 'react';

import Label from './Label';

describe('Label', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Label />,
    );

    expect(wrapper).not.toBeNull();
  });

  it('should render text', () => {
    const wrapper = shallow(
      <Label text="Smth Label" />,
    );

    expect(wrapper.text()).toEqual('Smth Label');
  });

  it('should contain additionalClass', () => {
    const wrapper = shallow(
      <Label text="Smth Label" className="AdditionalClass" />,
    );

    expect(wrapper.is('.AdditionalClass')).toBeTruthy();
  });
});
