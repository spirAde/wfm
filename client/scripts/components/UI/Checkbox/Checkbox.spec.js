import React from 'react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Checkbox name="checkbox" />,
    );

    const instance = wrapper.instance();

    expect(instance).toBeInstanceOf(Checkbox);
  });

  it('should render label', () => {
    const label = 'smth label';

    const wrapper = shallow(
      <Checkbox name="checkbox" label={label} />,
    );

    expect(wrapper.find('.LabelText').text()).toBe(label);
  });

  it('should render checked', () => {
    const label = 'smth label';

    const wrapper = shallow(
      <Checkbox name="checkbox" label={label} checked />,
    );

    expect(wrapper.props('checked')).toBeTruthy();
    expect(wrapper.find('input').prop('checked')).toBeTruthy();
  });

  it('should change checked', () => {
    const name = 'checkbox';
    const label = 'smth label';
    const onChange = jest.fn();

    const wrapper = shallow(
      <Checkbox name={name} label={label} onChange={onChange} />,
    );

    wrapper.find('input').simulate('change', { target: { checked: true } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(name, true);

    wrapper.find('input').simulate('change', { target: { checked: false } });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(name, false);
  });
});
