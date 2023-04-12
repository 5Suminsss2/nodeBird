import React, { useState } from "react";
import Protypes from "prop-types";
import Link from "next/link"; // 넥스트에서 자체적으로 링크 라우터 제공
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            {/* a태그 아닌 link에 href 쓰기 */}
            <a>노드버드</a>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link href="/profile">
            {/* a태그 아닌 link에 href 쓰기 */}
            <a>프로필</a>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <SearchInput />
        </Menu.Item>

        <Menu.Item>
          <Link href="/signup">
            {/* a태그 아닌 link에 href 쓰기 */}
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      {/* 크기 
        xs : 모바일
        sm : 태블릿
        md : 작은 데스크탑
      */}
      <Row gutter={8}>
        {/* 
            - gutter : column 사이에 간격주기
            - 모바일일 때는 24칸 모두 차지하지만 어느정도 가면 6칸 차지 (n/24)
            - 합쳐서 24를 넘으면 다음 칸으로 이동
        */}
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.naver.com/1012ksm"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by Sumin
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.prototype = {
  children: Protypes.node.isRequired, // node : node js의 node가 아닌 리액트의 node로 리액트 안에 모든 것이라 할 수 있음
};

export default AppLayout;
