import React, { PropTypes } from 'react';
import { createAsyncComponent } from 'react-async-component';

import { match } from '../../utils/match';

import modalTypes from './types';

import { Modal, Spinner } from '../UI';

const ModalConductor = ({
  component,
  show,
  isClosable,
  style,
  backdropStyle,
  backdropClassName,
  onHide,
  ...props
}) => {
  const ModalComponent = createAsyncComponent({
    resolve: () => new Promise(resolve => match(component, {
      PhoneVerificationForm: () => require.ensure(
        ['../PhoneVerificationForm/PhoneVerificationForm'],
        require => resolve(require('../PhoneVerificationForm/PhoneVerificationForm')),
        'phone-verification-form',
      ),
      ActivationRetirementForm: () => require.ensure(
        ['../ActivationRetirementForm/ActivationRetirementForm'],
        require => resolve(require('../ActivationRetirementForm/ActivationRetirementForm')),
        'activation-retirement-form',
      ),
      RecurringCreatingGroupForm: () => require.ensure(
        ['../RecurringCreatingGroupForm/RecurringCreatingGroupForm'],
        require => resolve(require('../RecurringCreatingGroupForm/RecurringCreatingGroupForm')),
        'recurring-creating-group-form',
      ),
      RecurringEditingGroupForm: () => require.ensure(
        ['../RecurringEditingGroupForm/RecurringEditingGroupForm'],
        require => resolve(require('../RecurringEditingGroupForm/RecurringEditingGroupForm')),
        'recurring-editing-group-form',
      ),
      RecurringEditingItemForm: () => require.ensure(
        ['../RecurringEditingItemForm/RecurringEditingItemForm'],
        require => resolve(require('../RecurringEditingItemForm/RecurringEditingItemForm')),
        'recurring-editing-item-form',
      ),
    }, () => {})),
    Loading: () => <Spinner />,
  });

  return (
    <Modal
      show={show}
      isClosable={isClosable}
      style={style}
      backdropStyle={backdropStyle}
      backdropClassName={backdropClassName}
      onHide={onHide}
    >
      <ModalComponent onHide={onHide} {...props} />
    </Modal>
  );
};

ModalConductor.displayName = 'ModalConductor';

ModalConductor.propTypes = {
  ...Modal.propTypes,
  component: PropTypes.oneOf(modalTypes),
};

ModalConductor.defaultProps = {
  component: '',
};

export default ModalConductor;
