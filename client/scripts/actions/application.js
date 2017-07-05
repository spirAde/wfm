export const CHECK_DEVICE = 'CHECK_DEVICE';
export const SET_VANARE_STATUS = 'SET_VANARE_STATUS';

export function checkDevice(isMobile) {
  return {
    type: CHECK_DEVICE,
    payload: {
      isMobile,
    },
  };
}

export function setVanareStatus(status) {
  return {
    type: SET_VANARE_STATUS,
    payload: {
      vanareIsDown: status,
    },
  };
}

