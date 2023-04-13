export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data) => {
  // THUNK 장점 : 한번에 dispatch가 여러개!!
  // THUNK 단점 : Delay가 같은 사가가 할 수 있는 것들은 다 구현해야함
  return (dispatch, getState) => {
    const state = getState(); // initial Reducer를 가져옴

    dispatch(logoinRequestAction());
    axios
      .post("/api/login")
      .then((res) => {
        dispatch(logoinSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(loginFailureAction(err));
      });
  };
};

// action creator
export const logoinRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export const logoinSuccessAction = (data) => {
  return {
    type: "LOG_IN_SUCCESS",
    data,
  };
};

export const loginFailureAction = (data) => {
  return {
    type: "LOG_OUT_FAILURE",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        // 새 객체 생성 === 다음 상태
        ...state, // 이전상태
        isLoggedIn: true, // 액션
        me: action.data,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };

    default:
      return state;
  }
};

export default reducer;
