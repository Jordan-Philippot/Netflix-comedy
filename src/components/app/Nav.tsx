import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "hooks/useAuth";

// ----------
// Component
// ----------
import NavItem from "components/ui/NavItem";
import Text from "components/ui/Text";
import Logo from "components/icon/Logo";
import Arrow from "components/icon/Arrow";
import Notification from "components/icon/Notification";
import Search from "components/icon/Search";

// ----------
// Assets
// ----------
import Avatar from "assets/avatar.png";
import Tooltip from "components/ui/Tooltip";

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
  width: 36px;
  height: 36px;
  margin-left: 25px;
`;
const StyledSearchContainer = styled.div`
  margin: auto 15px;
  cursor: pointer;
`;

function Nav() {
  let navigate = useNavigate();

  const { logout, user } = useAuth();

  return (
    <>
      <StyledNav>
        <Link to="/">
          <Logo />
        </Link>

        <StyledLinkNav>
          <NavItem labelKey="Vidéos" path="/videos" />
          {user && (
            <NavItem labelKey="Abonnements" path="/user/subscriptions" />
          )}
        </StyledLinkNav>

        <StyledRightNav>
          <StyledSearchContainer onClick={() => navigate("/search")}>
            <Search />
          </StyledSearchContainer>

          {user ? (
            <>
              <NavItem labelKey={<Notification />} path="notifications" />
              <NavItem labelKey="Ma liste" path="user/list" />

              <Tooltip
                isClickable
                label={
                  <StyledAvatarContainer>
                    <StyledAvatarImg src={Avatar} alt="avatar logged" />
                    <Arrow rotation={"bottom"} />
                  </StyledAvatarContainer>
                }
                position="bottom"
              >
                <Text color="dark">{user?.firstname}</Text>
                <Link to="user/profile">Mon profil</Link>
                <Text color="dark" onClick={() => logout()}>
                  Se déconnecter
                </Text>
              </Tooltip>
            </>
          ) : (
            <NavItem labelKey="Connexion" path="/login" />
          )}
        </StyledRightNav>
      </StyledNav>
    </>
  );
}

export default Nav;
