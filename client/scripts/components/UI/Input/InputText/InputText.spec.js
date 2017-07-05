import React from 'react';

import InputText from './InputText';
import Icon from '../../Icon/Icon';

describe('InputText', () => {
  it('should render', () => {
    const wrapper = mount(
      <InputText />,
    );

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render set props', () => {
    const wrapper = mount(
      <InputText type="text" placeholder="First Name" name="firstName" />,
    );

    expect(wrapper.prop('type')).toEqual('text');
    expect(wrapper.prop('placeholder')).toEqual('First Name');
    expect(wrapper.prop('name')).toEqual('firstName');
  });

  it('should render icon left', () => {
    const wrapper = mount(
      <InputText type="text" placeholder="First Name" name="firstName" icon="ok" iconAlign="left" />,
    );

    expect(wrapper.prop('iconAlign')).toEqual('left');
    expect(wrapper.find(Icon).prop('icon')).toEqual('ok');

    expect(wrapper.find('.Icon').exists()).toBeTruthy();
    expect(wrapper.find('.Icon').is('.AlignLeft')).toBeTruthy();
  });

  it('should render icon right', () => {
    const wrapper = mount(
      <InputText type="text" placeholder="First Name" name="firstName" icon="ok" iconAlign="right" />,
    );

    expect(wrapper.prop('iconAlign')).toEqual('right');
    expect(wrapper.find(Icon).prop('icon')).toEqual('ok');

    expect(wrapper.find('.Icon').exists()).toBeTruthy();
    expect(wrapper.find('.Icon').is('.AlignRight')).toBeTruthy();
  });

  it('should render error', () => {
    const wrapper = mount(
      <InputText type="text" errorText="Invalid field" />,
    );

    expect(wrapper.find('.ErrorField').exists()).toBeTruthy();
    expect(wrapper.find('.ErrorField').text()).toEqual('Invalid field');
  });

  it('should render red border around field if errorText prop exists', () => {
    const wrapper = mount(
      <InputText type="text" errorText="Invalid field" />,
    );

    expect(wrapper.find('.InputField').is('.Error')).toBeTruthy();
  });

  it('check defaultValue', () => {
    const wrapper = mount(
      <InputText type="text" value="smth default value" />,
    );

    expect(wrapper.find('input').prop('value')).toEqual('smth default value');
  });

  it('check onChange event', () => {
    const onChange = jest.fn();

    const wrapper = shallow(
      <InputText type="text" onChange={onChange} />,
    );

    wrapper.find('input').simulate('change', 'smth value');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('smth value');
  });
});
