// pages들의 공통적인 부분 처리하는 파일 _app.js
import Protypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head"; // 헤드 부분만 수정할 수 있도록 next에서 지원
import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  ); // index, profile, signup.js가 component로 들어간다
};

NodeBird.prototype = {
  Component: Protypes.node.isRequired, // node : node js의 node가 아닌 리액트의 node로 리액트 안에 모든 것이라 할 수 있음
};

export default wrapper.withRedux(NodeBird);
