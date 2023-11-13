import { Link } from "react-router-dom";
import styled from "styled-components";

// ----------
// Component
// ----------
import Logo from "components/icon/Logo";
import NavItem from "components/ui/NavItem";
import Arrow from "components/icon/Arrow";

// ----------
// Assets
// ----------
import Avatar from "assets/avatar.png";
import Notifications from "assets/Notification.svg";
import Search from "assets/Search.svg";

const StyledNav = styled.nav`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: start;
  padding: 10px 0;
`;

const StyledLinkNav = styled.div`
  margin: auto 25px;
  display: flex;
`;

const StyledRightNav = styled.div`
  margin-left: auto;
  display: flex;
  color: white;
`;

const StyledAvatarContainer = styled.div`
  display: flex;
  margin: auto;
  :hover {
    cursor: pointer;
  }
`;

const StyledAvatarImg = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 25px;
`;

function Nav() {
  return (
    <StyledNav>
      <Link to="">
        <Logo />
      </Link>

      <StyledLinkNav>
        <NavItem labelKey="Accueil" path="" />
        <NavItem labelKey="Vidéos" path="/videos" />
        <NavItem labelKey="Podcasts" path="/podcasts" />
      </StyledLinkNav>

      <StyledRightNav>
        <NavItem labelKey={<img src={Search} alt="search" />} path="search" />

        <NavItem
          labelKey={<img src={Notifications} alt="notifications" />}
          path="notifications"
        />
        <NavItem labelKey="Ma liste" path="list" />

        <StyledAvatarContainer>
          <StyledAvatarImg src={Avatar} alt="avatar logged" />
          <Arrow rotation={"bottom"} />
        </StyledAvatarContainer>
      </StyledRightNav>
    </StyledNav>
  );
}

export default Nav;
