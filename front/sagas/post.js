import produce from "immer";
import {
  all,
  fork,
  call,
  put,
  takeLatest,
  delay,
} from "@redux-saga/core/effects"; // 사가의 effect

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  generateDummyPost,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import shortId from "shortid";

function addPostAPI(data) {
  return axios.post("/api/addPost", data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data); // yield는 await과 비슷하다

    const id = shortId.generate();

    yield put({
      // put : === dispatch 이 액션 객체를 디스패치 해라
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });

    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete("/api/post", data);
}

function* removePost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data); // yield는 await과 비슷하다

    const id = shortId.generate();

    // POST 상태에서 POST 값 변경
    yield put({
      // put : === dispatch 이 액션 객체를 디스패치 해라
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });

    // 유저상태에서 POST 값 변경
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${postId}/comment`, data);
}

function* addComment(action) {
  try {
    yield delay(1000);
    // const result = yield call(addCommentAPI, action.data); // yield는 await과 비슷하다

    yield put({
      // put : === dispatch 이 액션 객체를 디스패치 해라
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
