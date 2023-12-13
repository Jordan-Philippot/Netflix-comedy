
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR_GREY, COLOR_GREY_DARK } from "utils/colors";

// ----------
// Components
// ----------
import Text from "components/ui/Text";
import Github from "components/icon/Github";
import LinkedIn from "components/icon/LinkedIn";
import Mail from "components/icon/Mail";
import Phone from "components/icon/Phone";

const StyledFooterContainer = styled.footer`
  position: relative;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px 0;
  width: fit-content;
  margin: 40px auto;
`;
const StyledHr = styled.hr`
  color: ${COLOR_GREY_DARK};
  width: 100%;
`;
const StyledSocialMediaContainer = styled.div`
  display: flex;
  gap: 0 30px;
`;
const StyledCguContainer = styled.div`
  display: flex;
  gap: 10px 30px;
  color: ${COLOR_GREY};
  font-size: 12px;
  flex-wrap: wrap;

  a {
    word-wrap: no-wrap;
  }
`;

export default function Footer() {
  return (
    <StyledFooterContainer>
      <StyledHr />
      <StyledSocialMediaContainer>
        <Link to={process.env.REACT_APP_GITHUB_LINK as string} target="_blank">
          <Github />
        </Link>
        <Link
          to={process.env.REACT_APP_LINKEDIN_LINK as string}
          target="_blank"
        >
          <LinkedIn />
        </Link>
        <Link to="/truc">
          <Phone />
        </Link>
        <Link to="/truc">
          <Mail />
        </Link>
      </StyledSocialMediaContainer>

      <StyledCguContainer>
        <Link to="/truc">Nous contacter</Link>{" "}
        <Link to="/truc">Mentions Légales</Link>{" "}
        <Link to="/truc">Conditions d'utilisation </Link>
        <Link to="/truc">Information légales </Link>
        <Link to="/truc">Centre d'aide </Link>
      </StyledCguContainer>

      <Text size="s">
        &copy; 2023 Netflix, Jordan Philippot - Développeur Fullstack{" "}
      </Text>
    </StyledFooterContainer>
  );
}
