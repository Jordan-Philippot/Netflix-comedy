import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { COLOR_BLACK } from "utils/colors";
import { useAuth } from "hooks/useAuth";

// ----------
// Components
// ----------
import Text from "components/ui/Text";
import Title from "components/ui/Title";
import Button from "components/ui/Button";
import Input from "components/ui/Input";

// ----------
// Assets
// ----------
import NetflixBg from "assets/netflix_bg.jpg";

export const StyledMainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin-left: -60px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${NetflixBg});
  background-size: cover;
`;
export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_BLACK}CC;
  border-radius: 4px;
  padding: 50px 50px 100px 50px;
  width: fit-content;
  height: fit-content;
`;

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user, navigate]);

  const btnStyle = {
    width: "100%",
    margin: "35px 0",
  };
  
  return (
    <StyledMainContainer>
      <StyledFormContainer>
        <Title weight="800" size="h1" style={{ letterSpacing: "1px" }}>
          S'identifier
        </Title>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: "20px" }}
        />

        <Button
          onClick={() => login(email, password)}
          label="S'identifier"
          color="red"
          style={btnStyle}
        />
        <Link to="help" style={{ textAlign: "right" }}>
          Besoin d'aide ?
        </Link>
        <Text style={{ marginTop: "15px" }}>
          Première visite sur Netflix ?
          <Link to="/register"> Inscrivez-vous</Link>
        </Text>
      </StyledFormContainer>
    </StyledMainContainer>
  );
}
