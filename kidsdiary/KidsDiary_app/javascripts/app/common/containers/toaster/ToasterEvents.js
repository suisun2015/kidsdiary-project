import { showToastr } from './ToasterAction';

export const NOTIFY_SHOW_TOASTR = 'com.stanby.advance.NOTIFY_SHOW_TOASTR';
export const NOTIFY_CLOSE_TOASTR = 'com.stanby.advance.NOTIFY_CLOSE_TOASTR';

const events = [
  {
    catch: [NOTIFY_SHOW_TOASTR],
    dispatch: showToastr
  }
];

export default events;
