import {
  all,
  fork,
  call,
  put,
  takeLatest,
  delay,
} from "@redux-saga/core/effects"; // 사가의 effect

import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from "../reducers/user";

// 이 함수에선 별표 붙이지 않는다.
function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data); // yield는 await과 비슷하다 // loginAPI(action.data) 라고 보통 쓰지만 call을 사용하면 펼쳐서 왼쪽과 같이 써야함

    // call 사용 : lopinapi이 리턴할때까지 기다려서 result에 넣어줌
    /* 아래와 같은 코드다
          axios.post("/api/login").then((result)=>{
          yield put({
              type: "LOG_IN_SUCCESS",
              data: result.data,
          });
          }) 
      */
    // fork 사용한다면 ? 비동기 실행이므로 login api 요청보내고 리턴 기다리지 않고 바로 다음코드로 넘어감
    /* 아래와 같은 코드다
          axios.post("/api/login");
          yield put({
              type: "LOG_IN_SUCCESS",
              data: result.data,
          });
      */
    yield put({
      // put : === dispatch 이 액션 객체를 디스패치 해라
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut(action) {
  try {
    yield delay(1000);
    // const result = yield call(logOutAPI); // yield는 await과 비슷하다

    yield put({
      // put : === dispatch 이 액션 객체를 디스패치 해라
      type: LOG_OUT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post("/api/signup");
}

function* signUp(action) {
  try {
    yield delay(1000);
    // const result = yield call(signUpAPI); // yield는 await과 비슷하다

    yield put({
      // put : === dispatch 이 액션 객체를 디스패치 해라
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI() {
  return axios.post("/api/follow");
}

function* follow(action) {
  try {
    // const result = yield call(followAPI);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI() {
  return axios.post("/api/unfollow");
}

function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn); // take: 로그인이라는 액션이 실행될때까지 기다리겠다. -> LOG_IN이라는 액션이 실행되면 logIn이라는 함수를 실행시키겠다
  // login in request의 action 자체가 login 함수에 전달되어짐

  // yield take의 단점 : 한번 밖에 사용을 못함!!!! ==> 그래서 등장한 takeEvery : 여러번 사용 가능해진다~!
  // takeLatest : 클릭 실수로 99번할 경우 가장 마지막에 클릭한 것만 실행 (앞의 것이 로딩중일 경우에 앞 다 응답 취소하고 마지막만 실행, 앞의 것이 이미 처리 완료했으면 앞의 것 그대로 실행하고 마지막도 실행)
  // takeLatest의 단점 : 프론트에서 서버로 가는 요청은 취소 x , 서버에서 프론트로 온 응답만 취소 -> 그래서 등장한 throttle : 몇초 안에 요청한 것들 취소해줌 (근데 보통 takeLatest를 많이 사용)
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
