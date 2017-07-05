import React from 'react';

import CheckGroup from './CheckGroup';
import Checkbox from '../Checkbox/Checkbox';

describe('CheckGroup', () => {
  it('should render', () => {
    const wrapper = shallow(
      <CheckGroup>
        <Checkbox name="checkbox1" />
        <Checkbox name="checkbox2" />
      </CheckGroup>,
    );

    const instance = wrapper.instance();

    expect(instance).toBeInstanceOf(CheckGroup);
  });

  it('should render children', () => {
    const wrapper = shallow(
      <CheckGroup>
        <Checkbox name="checkbox1" />
        <Checkbox name="checkbox2" />
      </CheckGroup>,
    );

    expect(wrapper.children().length).toEqual(2);
    expect(wrapper.children().last().type()).toEqual(Checkbox);
  });

  it('should render children by row line', () => {
    const wrapper = shallow(
      <CheckGroup align="row">
        <Checkbox name="checkbox1" />
        <Checkbox name="checkbox2" />
      </CheckGroup>,
    );

    expect(wrapper.is('.AlignRow')).toBeTruthy();
  });

  it('should change checked status', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <CheckGroup align="row" onChange={onChange}>
        <Checkbox name="checkbox1" label="checkbox1" />
        <Checkbox name="checkbox2" label="checkbox2" />
      </CheckGroup>,
    );

    const firstCheckbox = wrapper.find(Checkbox).first();
    const secondCheckbox = wrapper.find(Checkbox).last();

    firstCheckbox.find('input').simulate('change', { target: { checked: true } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['checkbox1']);

    secondCheckbox.find('input').simulate('change', { target: { checked: true } });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(['checkbox1', 'checkbox2']);

    secondCheckbox.find('input').simulate('change', { target: { checked: false } });

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith(['checkbox1']);
  });

  it('check default state with checked', () => {
    const wrapper = shallow(
      <CheckGroup align="row">
        <Checkbox name="checkbox1" label="checkbox1" checked />
        <Checkbox name="checkbox2" label="checkbox2" />
        <Checkbox name="checkbox3" label="checkbox3" checked />
      </CheckGroup>,
    );

    expect(wrapper.state('checkedValues')).toEqual(['checkbox1', 'checkbox3']);
  });
});
