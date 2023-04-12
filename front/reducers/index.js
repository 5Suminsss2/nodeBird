import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";

// reducer는 (이전상태, 액션) 을 통해서 => 다음상태를 만들어냄
//combineReducers : 리듀서 합치기
const rootReducer = combineReducers({
  // hydrate(서버사이드렌더링을 위한 기능)를 위해 index 리듀서를 넣음
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("hydrate", action);
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
