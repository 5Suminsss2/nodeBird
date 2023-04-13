// saga는 제너레이터 문법을 사용함
// 근데 너무 놀라지 말고 그냥 그렇구나 하고 넘어도 됨

/* generator란?
const gen = function* () {
    console.log(1);
    yield;              // yeild까지만 가고 멈춤
    console.log(2);
    yeild;
    console.log(3);
    yeild 4;
}
gen(); // 이렇게 하면 안되고
gen.next(); // 이렇게 하면 실행됨 // 1 이 뜨고 yeild까지 실행하고 멈춤
gen.next(); // 이렇게 하면 실행됨 // 2 이 뜨고 yeild까지 실행하고 멈춤
gen.next(); // 이렇게 하면 실행됨 // 3 이 뜨고 yeild 4까지 실행 --> {value: 4, done: false} 하고 멈춤
gen.next(); // {value: undefined. done: true} // done이 true가 될때까지 next 가능

*/

import { all, fork, call, put, take } from "@redux-saga/core/effects"; // 사가의 effect

// 이 함수에선 별표 붙이지 않는다.
function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); // yield는 await과 비슷하다 // loginAPI(action.data) 라고 보통 쓰지만 call을 사용하면 펼쳐서 왼쪽과 같이 써야함

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
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    const result = yield call(logOutAPI); // yield는 await과 비슷하다

    yield put({
      // put : === dispatch 이 액션 객체를 디스패치 해라
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/addPost", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data); // yield는 await과 비슷하다

    yield put({
      // put : === dispatch 이 액션 객체를 디스패치 해라
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield take("LOG_IN_REQUEST", logIn); // take: 로그인이라는 액션이 실행될때까지 기다리겠다. -> LOG_IN이라는 액션이 실행되면 logIn이라는 함수를 실행시키겠다
  // login in request의 action 자체가 login 함수에 전달되어짐
}

function* watchLogOut() {
  yield take("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield take("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  // all : 배열 안에 들어있는 것들을 한방에 실행해줌
  // fork : 비동기 함수를 실행해줌
  // call : 동기 함수를 실행해줌
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
