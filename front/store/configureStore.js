import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import reducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

// thunk : 리덕스를 비동기로 실행할 수 있게 해주는 미들웨어
// thunk 장점 : 하나의 비동기 액션 안에서 여러개의 동기 액션을 넣을 수 있음/  dispatch를 여러번 할 수 있음

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action); // 액션을 실행학시 전에 콘솔창 띄우는 미들웨어
    return next(action);
  };

const configureStore = () => {
  const middlewares = [thunkMiddleware, loggerMiddleware]; // 미들웨어 : 리덕스의 기능 향상시키기
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares)); // redux dev tools와 연동하기
  const store = createStore(reducer, enhancer);

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
