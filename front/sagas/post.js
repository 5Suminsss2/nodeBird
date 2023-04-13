import {
  all,
  fork,
  call,
  put,
  takeLatest,
  delay,
} from "@redux-saga/core/effects"; // 사가의 effect

function addPostAPI(data) {
  return axios.post("/api/addPost", data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data); // yield는 await과 비슷하다

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

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
