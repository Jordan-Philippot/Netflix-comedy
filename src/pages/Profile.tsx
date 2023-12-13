import { useEffect, useState } from "react";
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
import { StyledFormContainer, StyledMainContainer } from "./Login";

export default function Profile() {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { profile, user, errors } = useAuth();

  const handleProfile = async () => {
    profile(password, firstname, lastname);
  };

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
    }
  }, [user]);

  
  const inputStyle = {
    marginTop: "20px",
    marginBottom: "5px",
  };
  const btnStyle = {
    width: "100%",
    margin: "35px 0",
  };

  return (
    <StyledMainContainer>
      <StyledFormContainer>
        <Title weight="800" size="h1" style={{ letterSpacing: "1px" }}>
          Votre profil
        </Title>
        <Input
          placeholder="Email"
          value={email}
          onChange={() => console.log("no change")}
          disabled
          style={inputStyle}
          status={"default"}
        />
        <Input
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          style={inputStyle}
          status={errors?.firstname ? "error" : "default"}
        />
        <Text color="dark">{errors?.firstname}</Text>

        <Input
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          style={inputStyle}
          status={errors?.lastname ? "error" : "default"}
        />
        <Text color="dark">{errors?.lastname}</Text>

        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          status={errors?.password ? "error" : "default"}
        />
        <Text color="dark">{errors?.password}</Text>

        <Button
          onClick={handleProfile}
          label="Enregistrer"
          color="red"
          style={btnStyle}
        />
      </StyledFormContainer>
    </StyledMainContainer>
  );
}
