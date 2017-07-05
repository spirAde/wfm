import React, { PropTypes } from 'react';
import Overlay from 'react-overlays/lib/Overlay';
import classNames from 'classnames';

import styles from './Tooltip.css';

const cx = classNames.bind(styles);

const Tooltip = ({
  placement = 'right',
  children,
  className,
  style = {},
  show,
  container,
  target,
  onHide,
  ...props
}) => {
  const tooltipClasses = cx('Tooltip', className);

  const contentClasses = cx('Content', {
    Visible: true,
    Left: placement === 'left',
    Right: placement === 'right',
    Top: placement === 'top',
    Bottom: placement === 'bottom',
  });

  return (
    <Overlay
      show={show}
      onHide={onHide}
      placement={placement}
      container={container}
      target={target}
      style={style.overlay || {}}
      {...props}
    >
      <div className={tooltipClasses} style={style.tooltip || {}}>
        <div className={contentClasses}>
          {children}
        </div>
      </div>
    </Overlay>
  );
};

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  ...Overlay.propTypes,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({
    overlay: PropTypes.object,
    tooltip: PropTypes.object,
  }),
};

Tooltip.defaultProps = {
  placement: 'left',
  children: [],
  className: '',
  style: {
    overlay: {},
    tooltip: {},
  },
};

export default Tooltip;
