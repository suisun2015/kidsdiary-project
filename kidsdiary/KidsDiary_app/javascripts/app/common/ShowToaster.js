import { SHOW_TOASTR, showToastr } from './containers/toaster/ToasterAction';

export const showInfo = (title, body, option) => {
  return (dispatch) => dispatch(showToastr('info', title, body, option));
};
export const showDanger = (title, body, option) => {
  return (dispatch) => dispatch(showToastr('danger', title, body, option));
};
export const showWarning = (title, body, option) => {
  return (dispatch) => dispatch(showToastr('warning', title, body, option));
};
export const showSuccess = (title, body, option) => {
  return (dispatch) => dispatch(showToastr('success', title, body, option));
};
