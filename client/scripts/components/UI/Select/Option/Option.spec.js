import React from 'react';

import Option from './Option';

const option = {
  value: 'employed',
  label: 'Employed',
};

describe('Option', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Option option={option} />,
    );

    const instance = wrapper.instance();

    expect(instance).toBeInstanceOf(Option);
  });

  it('should show label', () => {
    const wrapper = shallow(
      <Option option={option} />,
    );

    expect(wrapper.text()).toBe(option.label);
    expect(wrapper.find('.Icon').exists()).toBeFalsy();
  });

  it('should render isSelected option', () => {
    const wrapper = shallow(
      <Option option={option} isSelected />,
    );

    expect(wrapper.find('.Icon').exists()).toBeTruthy();
    expect(wrapper.is('.Selected')).toBeTruthy();
  });

  it('should render isDisabled option', () => {
    const wrapper = shallow(
      <Option option={option} isDisabled />,
    );

    expect(wrapper.is('.Disabled')).toBeTruthy();
  });

  it('should simulate click', () => {
    const onClick = jest.fn();

    const wrapper = shallow(
      <Option option={option} onClick={onClick} />,
    );

    wrapper.simulate('click', { preventDefault: () => {} });

    expect(onClick).toHaveBeenCalledWith(option.value);
  });

  it('should not simulate click by isDisabled option', () => {
    const onClick = jest.fn();

    const wrapper = shallow(
      <Option option={option} isDisabled onClick={onClick} />,
    );

    wrapper.simulate('click', { preventDefault: () => {} });

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
