import React from 'react';

import InputCurrency from './InputCurrency';
import InputNumber from '../InputNumber/InputNumber';

describe('InputCurrency', () => {
  it('should render', () => {
    const wrapper = mount(
      <InputCurrency />,
    );

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should contain InputNumber component', () => {
    const wrapper = mount(
      <InputCurrency />,
    );

    expect(wrapper.find(InputNumber).exists()).toBeTruthy();
  });

  it('should contain default thousandSeparator="," and decimalSeparator="."', () => {
    const wrapper = mount(
      <InputCurrency />,
    );

    expect(wrapper.find(InputNumber).prop('thousandSeparator')).toEqual(',');
    expect(wrapper.find(InputNumber).prop('decimalSeparator')).toEqual('.');
  });

  it('should contain symbol', () => {
    const wrapper = shallow(
      <InputCurrency symbol="$" />,
    );

    expect(wrapper.is('.WithSymbol')).toBeTruthy();
    expect(wrapper.find('.Symbol').text()).toEqual('$');
  });

  it('should contain staticCents', () => {
    const wrapper = shallow(
      <InputCurrency staticCents />,
    );

    expect(wrapper.find('.CentsField').exists()).toBeTruthy();
    expect(wrapper.find('.Cents').text()).toEqual('.00');
  });

  it('should contain symbol and staticCents', () => {
    const wrapper = shallow(
      <InputCurrency symbol="$" staticCents />,
    );

    expect(wrapper.is('.WithSymbol')).toBeTruthy();
    expect(wrapper.find('.Symbol').text()).toEqual('$');

    expect(wrapper.find('.CentsField').exists()).toBeTruthy();
    expect(wrapper.find('.Cents').text()).toEqual('.00');
  });

  it('check onChange event', () => {
    const onChange = jest.fn();

    const wrapper = mount(
      <InputCurrency onChange={onChange} />,
    );

    wrapper.find('input').simulate('change', { target: { value: '123123123' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('123123123');
  });

  it('should change leading dot like 0.', () => {
    const wrapper = mount(
      <InputCurrency />,
    );

    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '.' } });
    expect(input.prop('value')).toEqual('0.');
  });

  it('should cut leading zeros', () => {
    const wrapper = mount(
      <InputCurrency />,
    );

    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '0' } });
    expect(input.prop('value')).toEqual('0');

    input.simulate('change', { target: { value: '00' } });
    expect(input.prop('value')).toEqual('0');

    input.simulate('change', { target: { value: '01' } });
    expect(input.prop('value')).toEqual('1');
  });

  it('check typing decimals for static cents', () => {
    const wrapper = mount(
      <InputCurrency staticCents />,
    );

    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '123123.' } });
    expect(input.prop('value')).toEqual('123,123');
  });
});
