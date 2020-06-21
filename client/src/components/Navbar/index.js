import React from "react";
import styled from "styled-components";

import Input from "../Input";
import UserCard from "../UserCard";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2em;
  height: 100px;
`;

const AddList = styled.button`
  background: white;
  font-weight: 200;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const LeftWrapper = styled.div`
  width: 20vw;
`;

const CenterWrapper = styled.div`
  width: 50vw;
`;

const RightWrapper = styled.div`
  width: 20vw;
  position: relative;
  right: 0;
  display: flex;
  justify-content: flex-end;
`;

const Navbar = () => (
  <Nav>
    <LeftWrapper>
      <AddList>Nueva Lista</AddList>
    </LeftWrapper>
    <CenterWrapper>
      <Input placeholder="Añade una nueva tarea..." />
    </CenterWrapper>
    <RightWrapper>
      <UserCard firstName="Alejo" lastName="Gschwind" />
    </RightWrapper>
  </Nav>
);

export default Navbar;
