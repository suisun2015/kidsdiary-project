import * as acts from '../actions/DiaryAction';
import {DIARY_FORM_INIT} from '../DiaryModels';

const initialData = {
  diaryList: {
    "totalHits": 0,
    "pageIndex": 0,
    "pageSize": 20,
    "list": []
  },

  diaryTimeline: {
    "list": []
  },

  detail: {
    "childId": "",
    "diaryDate": "",
    "guardian": DIARY_FORM_INIT,
    "teacher": DIARY_FORM_INIT,
    "body": [
      {
        "userId": "",
        "userName": "",
        "userType": "",
        "textContent": "",
        "photos": [],
        "time": "",
        "avatarUrl": ""
      }
    ]
  },

  myDetail: {
  "childId": "", 
  "diaryDate": "", 
  "height": "", 
  "weight": "",
  "lunch": "", 
  "pickUpPerson": "", 
  "pickUpTime": "", 
  "textContent": "",
  "photos": [],  
  "bath": [], 
  "food": [], 
  "health": [], 
  "nailCare": [], 
  "pee": [], 
  "poop": [], 
  "sleep": [], 
  "walking": []
  },

  snackbar: {
    open: false,
    message: ''
  },
  formValues: {}
};

export default function diary(state = initialData, action = {}) {
  switch (action.type) {
    case acts.INITIALIZE:
      return {
          ...state,
          ...initialData
      };

     case acts.RECEIVE_MY_PROFILE:
      console.log('receiveprofile');
      return {
        ...state,
        myProfile: action.data
      };
   
    case acts.RECEIVE_PROFILE:
      return {
        ...state,
        profile: action.data
      };

    case acts.RECEIVE_DIARY_LIST:
      return {
        ...state,
        diaryList: action.data
      };

    case acts.RECEIVE_MY_DETAIL:
      return {
        ...state,
        myDetail: action.data
      };

    case acts.RECEIVE_DETAIL:
      return {
        ...state,
        detail: action.data
      };

    case acts.RECEIVE_TIMELINE:
      return {
        ...state,
        diaryTimeline: action.data
      };

    case acts.DIARY_OPEN_CLOSE:
      return {
        ...state,
        snackbar: action.data
      };

    default :
      return state;
  }
}
