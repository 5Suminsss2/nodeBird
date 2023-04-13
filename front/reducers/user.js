export const initialState = {
  IsLoggingIn: false, // 로그인 시도중
  isLoggedIn: false,
  IsLoggingOut: false, // 로그아웃 시도중
  me: null,
  signUpData: {},
  loginData: {},
};

// action creator
export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: "LOG_OUT_REQUEST",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      // request 될때 사가랑 리듀서랑 같이 실행됨 (sagas/user에서 login 함수 파트)
      return {
        // 새 객체 생성 === 다음 상태
        ...state, // 이전상태
        isLoggingIn: true, // 액션
      };
    case "LOG_IN_SUCCESS":
      return {
        // 새 객체 생성 === 다음 상태
        ...state, // 이전상태
        IsLoggingIn: false, // 액션
        isLoggedIn: true,
        me: { ...action.data, nickname: "zerocho" },
      };
    case "LOG_IN_FAILURE":
      return {
        // 새 객체 생성 === 다음 상태
        ...state, // 이전상태
        isLoggingIn: false, // 액션
        isLoggedIn: false,
        me: action.data,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default reducer;
