import * as React from "react";
import styled from "styled-components";
const logo = require("./logo.png");

const HeaderContainer = styled.div`
  background: #ffdd00;
  height: 50px;
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default class Header extends React.Component {
  render() {
    return (
      <HeaderContainer>
        <img src={logo} height="40px" />
      </HeaderContainer>
    );
  }
}
