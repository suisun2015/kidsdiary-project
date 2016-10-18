import { NOTIFY_SHOW_TOASTR, NOTIFY_CLOSE_TOASTR } from './ToasterEvents';

export const SHOW_TOASTR = 'com.stanby.advance.SHOW_TOASTR';
export const CLOSE_TOASTR = 'com.stanby.advance.CLOSE_TOASTR';

export const closeToastr = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_TOASTR });
  };
};

export const showToastr = (alertType, title, body, option = {}) => {
  const { timeout = 10000, delay = 300 } = option;
  return (dispatch) => {
    setTimeout(() => {
      dispatch({type: SHOW_TOASTR, alertType: alertType, title: title, body: body});
      setTimeout(() => {
        dispatch(closeToastr());
      }, timeout);
    }, delay);
  };
};
