import styled from "styled-components";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { COLOR_BLACK } from "utils/colors";
import Messages from "components/app/Messages";
import Nav from "components/app/Nav";

interface StyledNavProps {
  isVisible: boolean;
}

const StyledLayout = styled.div`
  position: relative;
  z-index: 1;
  width: 100vw;
  overflow-x: hidden;
  background-color: ${COLOR_BLACK};
  font-family: "Poppins", sans-serif;
`;

const StyledHeader = styled.header<StyledNavProps>`
  position: ${(props) => (props.isVisible ? "fixed" : "relative")};
  z-index: 1;
  padding: 0 60px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  box-sizing: border-box;
  width: 100%;
  min-width: 800px;
  margin: auto;
`;

const StyledContainer = styled.div`
  padding: 0px 60px;
`;

function MainLayout() {
  const [isVisible, setIsVisible] = useState(true);

  window.addEventListener("scroll", function () {
    const windowHeght = window.innerHeight as number;
    const scrollOffset = window.scrollY as number;
    if (scrollOffset > windowHeght + 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <StyledLayout>
      <StyledHeader isVisible={isVisible}>
        <Nav />
      </StyledHeader>

      <StyledContainer>
        <Outlet />
      </StyledContainer>
      <Messages />
    </StyledLayout>
  );
}

export default MainLayout;
