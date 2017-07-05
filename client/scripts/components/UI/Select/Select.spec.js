import React from 'react';

import { PureSelect } from './Select';
import Option from './Option/Option';

const options = [
  {
    value: 'employed',
    label: 'Employed',
  },
  {
    value: 'selfEmployed',
    label: 'Self-employed',
  },
  {
    value: 'notCurrentlyWorking',
    label: 'Not Currently Working',
  },
  {
    value: 'student',
    label: 'Student',
  },
  {
    value: 'retired',
    label: 'Retired',
  },
];

describe('Select', () => {
  it('should render', () => {
    const wrapper = shallow(
      <PureSelect options={options} />,
    );

    const instance = wrapper.instance();

    expect(instance).toBeInstanceOf(PureSelect);
  });

  it('should contain default props', () => {
    const wrapper = shallow(
      <PureSelect options={options} />,
    );

    const props = wrapper.instance().props;

    expect(props.options).toEqual(options);
    expect(props.options).toBeInstanceOf(Array);
    expect(props.placeholder).toEqual('');
    expect(props.selectedValue).toBeUndefined();
  });

  it('should contain default state', () => {
    const wrapper = shallow(
      <PureSelect options={options} />,
    );

    const state = wrapper.state();

    expect(state.isOpen).toBeFalsy();
    expect(state.selectedValue).toBeUndefined();
  });

  it('should show placeholder if selectedValue is undefined', () => {
    const placeholder = 'Select type';

    const wrapper = shallow(
      <PureSelect options={options} placeholder={placeholder} />,
    );

    expect(wrapper.find('.Label').text()).toBe(placeholder);
  });

  it('should show selectedValue label', () => {
    const selectedValue = 'employed';
    const selectedLabel = 'Employed';

    const wrapper = shallow(
      <PureSelect options={options} value={selectedValue} />,
    );

    expect(wrapper.find('.Label').text()).toBe(selectedLabel);
  });

  it('should show options box by clicking', () => {
    const wrapper = shallow(
      <PureSelect options={options} />,
    );

    wrapper.simulate('click', { preventDefault: () => {} });

    expect(wrapper.state('isOpen')).toBeTruthy();
    expect(wrapper.find('.Box').exists()).toBeTruthy();
  });

  it('should render all options', () => {
    const wrapper = shallow(
      <PureSelect options={options} />,
    );

    wrapper.simulate('click', { preventDefault: () => {} });

    expect(wrapper.find('.OptionList').find(Option)).toHaveLength(options.length);
  });

  it('should return value by onSelect event', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <PureSelect options={options} onChange={onChange} />,
    );

    wrapper.simulate('click', { preventDefault: () => {} });
    wrapper.find(Option).first().simulate('click');

    expect(onChange).toHaveBeenCalledWith(options[0].value);
  });
});
