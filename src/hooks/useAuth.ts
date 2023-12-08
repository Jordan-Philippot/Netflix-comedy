import { getUser, login, register, setProfile } from "api/user";
import { UserType } from "api/user.type";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMessage from "hooks/useMessage";

export type FieldErrors = {
  [fieldName: string]: any;
};

interface AuthHook {
  user: UserType | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  profile: (password: string, firstname: string, lastname: string) => void;
  register: (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) => void;
  errors: FieldErrors | undefined;
  isLogged: boolean | undefined;
}

export function useAuth(): AuthHook {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { sendInformation, sendError } = useMessage();

  const [errors, setErrors] = useState<FieldErrors | undefined>();
  const [isLogged, setIsLogged] = useState<boolean>();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  const mutationUser = useMutation({
    mutationFn: getUser,
    mutationKey: ["user"],
    onSuccess: async () => {
      setErrors(undefined);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      const initialDataQuery = await queryClient.getQueryData(["user"]);
      await queryClient.setQueryData(["user"], initialDataQuery);
      setIsLogged(true);
    },
    onError: () => {
      setIsLogged(false);

      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["userLikeList"] });
      queryClient.removeQueries({ queryKey: ["userSubscriptions"] });
      queryClient.removeQueries({ queryKey: ["userFavorites"] });
    },
  });

  const loginHandler = async (email: string, password: string) => {
    try {
      const loginResponse = await login({ email, password });

      if (loginResponse.token) {
        localStorage.setItem("userToken", loginResponse.token);
        mutationUser.mutate();
        sendInformation("Bienvenue sur Netflix Comedy !");
      } else {
        sendError("Identifiants incorrects");
      }
    } catch (error) {
      sendError("Identifiants incorrects");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    mutationUser.mutate();
    sendInformation("Déconnexion réussie");
    navigate("/");
  };

  const registerHandler = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) => {
    try {
      const registerResponse = await register({
        email,
        password,
        firstname,
        lastname,
      });

      if (registerResponse.registered) {
        loginHandler(email, password);
      } else if (registerResponse.errors) {
        setErrors(registerResponse.errors);
      }
    } catch (error) {
      sendError("Erreur lors de l'enregistrement");
    }
  };

  const profileHandler = async (
    password: string,
    firstname: string,
    lastname: string
  ) => {
    try {
      const profileResponse = await setProfile({
        password,
        firstname,
        lastname,
      });

      if (profileResponse.user) {
        mutationUser.mutate();
        sendInformation("Profil enregistré");
      } else if (profileResponse.errors) {
        setErrors(profileResponse.errors);
      }
    } catch (error) {
      sendError("Erreur lors de l'enregistrement");
    }
  };

  return {
    user: data,
    login: loginHandler,
    logout: logoutHandler,
    register: registerHandler,
    profile: profileHandler,
    errors,
    isLogged,
  };
}
