import React from 'react';

import Field from './Field';

import Label from '../Label/Label';
import InputText from '../Input/InputText/InputText';
import InputNumber from '../Input/InputNumber/InputNumber';
import InputCurrency from '../Input/InputCurrency/InputCurrency';
import InputSSN from '../Input/InputSSN/InputSSN';
import Select from '../Select/Select';

describe('Field', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Field />,
    );

    expect(wrapper).not.toBeNull();
  });

  it('should render label', () => {
    const wrapper = shallow(
      <Field label="Smth Label" />,
    );

    expect(wrapper.find(Label).exists()).toBeTruthy();
  });

  it('should render with row align', () => {
    const wrapper = shallow(
      <Field label="Smth Label" align="row" />,
    );

    expect(wrapper.is('.Row')).toBeTruthy();
  });

  it('should render corresponding component depending on prop type', () => {
    const wrapper = shallow(
      <Field type="text" />,
    );

    expect(wrapper.find(InputText).exists()).toBeTruthy();

    wrapper.setProps({ type: 'number' });
    expect(wrapper.find(InputNumber).exists()).toBeTruthy();

    wrapper.setProps({ type: 'currency' });
    expect(wrapper.find(InputCurrency).exists()).toBeTruthy();

    // TODO: change when InputSSN component will be done
    /*wrapper.setProps({ type: 'ssn' });
    expect(wrapper.find(InputSSN).exists()).toBeTruthy();*/

    wrapper.setProps({ type: 'select' });
    expect(wrapper.find(Select).exists()).toBeTruthy();
  });

  it('should pass only password, email, text, tel type to child input', () => {
    const wrapper = mount(
      <Field type="password" />,
    );

    expect(wrapper.find('input').prop('type')).toEqual('password');

    wrapper.setProps({ type: 'text' });
    expect(wrapper.find('input').prop('type')).toEqual('text');

    wrapper.setProps({ type: 'email' });
    expect(wrapper.find('input').prop('type')).toEqual('email');

    wrapper.setProps({ type: 'number' });
    expect(wrapper.find('input').prop('type')).not.toEqual('number');
    expect(wrapper.find('input').prop('type')).toEqual('text');

    wrapper.setProps({ type: 'currency' });
    expect(wrapper.find('input').prop('type')).not.toEqual('currency');
    expect(wrapper.find('input').prop('type')).toEqual('text');
  });
});
