import React from 'react';

import InputNumber from './InputNumber';
import InputText from '../InputText/InputText';

describe('InputNumber', () => {
  it('should render', () => {
    const wrapper = shallow(
      <InputNumber />,
    );

    const instance = wrapper.instance();

    expect(instance).toBeInstanceOf(InputNumber);
  });

  it('should contain InputText component', () => {
    const wrapper = mount(
      <InputNumber />,
    );

    expect(wrapper.find(InputText).exists()).toBeTruthy();
  });

  it('check using alphabetical characters', () => {
    const wrapper = mount(
      <InputNumber value="smth text, which should not be shown" />,
    );

    expect(wrapper.find('input').prop('value')).toEqual('');

    wrapper.find('input').simulate('change', { target: { value: 'a' } });

    expect(wrapper.find('input').prop('value')).toEqual('');
  });

  it('should render with thousand separator and default value', () => {
    const wrapper = mount(
      <InputNumber thousandSeparator value="123123123" />,
    );

    expect(wrapper.find('input').prop('value')).toEqual('123,123,123');
  });

  it('check onChange event', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <InputNumber onChange={onChange} />,
    );

    wrapper.find('input').simulate('change', { target: { value: '123123123' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('123123123');
  });

  it('should render with thousand separator by typing', () => {
    const wrapper = mount(
      <InputNumber thousandSeparator />,
    );

    wrapper.find('input').simulate('change', { target: { value: '123123123' } });

    expect(wrapper.find('input').prop('value')).toEqual('123,123,123');
  });

  it('should cut decimals characters', () => {
    const wrapper = mount(
      <InputNumber thousandSeparator decimalSeparator={false} />,
    );

    wrapper.find('input').simulate('change', { target: { value: '1231.' } });

    expect(wrapper.find('input').prop('value')).toEqual('1,231');
  });

  it('should cut decimals characters for default value', () => {
    const wrapper = mount(
      <InputNumber thousandSeparator decimalSeparator={false} value="1231.23" />,
    );

    expect(wrapper.find('input').prop('value')).toEqual('123,123');
  });

  it('should render decimals characters for default value', () => {
    const wrapper = mount(
      <InputNumber thousandSeparator decimalSeparator value="1231.23" />,
    );

    expect(wrapper.find('input').prop('value')).toEqual('1,231.23');
  });

  it('should prepare value according to pattern ', () => {
    const wrapper = mount(
      <InputNumber pattern="phone" />, // XXX-XXX-XXXX, from utils/patterns
    );

    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '1' } });
    expect(input.prop('value')).toEqual('1');

    input.simulate('change', { target: { value: '123' } });
    expect(input.prop('value')).toEqual('123');

    input.simulate('change', { target: { value: '1234' } });
    expect(input.prop('value')).toEqual('123-4');

    input.simulate('change', { target: { value: '1234567' } });
    expect(input.prop('value')).toEqual('123-456-7');

    input.simulate('change', { target: { value: '1234567890' } });
    expect(input.prop('value')).toEqual('123-456-7890');
  });

  it('should set state for componentWillReceiveProps ', () => {
    const wrapper = mount(
      <InputNumber thousandSeparator decimalSeparator />,
    );

    expect(wrapper.state('value')).toEqual('');

    wrapper.setProps({ value: '1231.23' });

    expect(wrapper.state('value')).toEqual('1231.23');
    expect(wrapper.state('formattedValue')).toEqual('1,231.23');
  });
});
