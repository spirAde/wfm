import React, { PropTypes } from 'react';
import OverlayModal from 'react-overlays/lib/Modal';

import classNames from 'classnames/bind';

import assign from 'lodash/assign';

import Icon from '../Icon/Icon';

import styles from './Modal.css';

const cx = classNames.bind(styles);

const Modal = ({
  show,
  isClosable,
  children,
  backdropStyle,
  backdropClassName,
  onHide,
  onBackdropClick,
  onEscapeKeyUp,
}) => (
  <OverlayModal
    show={show}
    backdropStyle={
      assign({}, backdropStyle, Modal.defaultStyles.backdrop)
    }
    backdropClassName={backdropClassName}
    onBackdropClick={onBackdropClick}
    onEscapeKeyUp={onEscapeKeyUp}
  >
    <div
      className={cx('Modal')}
    >
      {
        isClosable &&
        <div className={cx('CloseZone')} onClick={onHide}>
          <Icon icon="close" style={{ opacity: 0.4, stroke: 'none' }} />
        </div>
      }
      {children}
    </div>
  </OverlayModal>
);

Modal.displayName = 'Modal';

Modal.propTypes = {
  ...OverlayModal.PropTypes,
  isClosable: PropTypes.bool,
  children: PropTypes.node,
};

Modal.defaultProps = {
  show: false,
  isClosable: true,
  children: [],
};

Modal.defaultStyles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 100,
  },
  content: {},
};

export default Modal;
