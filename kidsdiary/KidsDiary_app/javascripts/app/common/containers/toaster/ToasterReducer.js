import { SHOW_TOASTR, CLOSE_TOASTR } from './ToasterAction';

const toaster = (state = {show: false, alertType: 'info', title: 'alert !', body: 'alert body.'}, action) => {
  const { alertType, title, body } = action;
  switch (action.type) {
    case SHOW_TOASTR:
      return {
        show: true,
        alertType: alertType,
        title: title,
        body: body
      };

    case CLOSE_TOASTR:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
};

export default toaster;
