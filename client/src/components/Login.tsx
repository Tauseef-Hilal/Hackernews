import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginMutation,
  LoginMutationVariables,
  RegisterMutation,
  RegisterMutationVariables,
} from "../lib/graphql/generated/graphql";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "../lib/graphql/mutations";
import { AUTH_TOKEN_KEY } from "../lib/utils/constants";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
  });

  const setTokenAndNavigateToHome = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    navigate("/");
  };

  const [register] = useMutation<RegisterMutation, RegisterMutationVariables>(
    REGISTER_MUTATION,
    {
      variables: {
        name: formState.name,
        email: formState.email,
        password: formState.password,
      },
      onCompleted: ({ register }) => {
        if (!register?.token) return;
        setTokenAndNavigateToHome(register.token);
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const [login] = useMutation<LoginMutation, LoginMutationVariables>(
    LOGIN_MUTATION,
    {
      variables: {
        email: formState.email,
        password: formState.password,
      },
      onCompleted: ({ login }) => {
        if (!login?.token) return;
        setTokenAndNavigateToHome(login.token);
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  return (
    <div>
      <h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={() => (formState.login ? login() : register())}
        >
          {formState.login ? "login" : "create account"}
        </button>
        <button
          className="pointer button"
          onClick={() =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? "need to create an account?"
            : "already have an account?"}
        </button>
      </div>
      <p>{error}</p>
    </div>
  );
};

export default Login;
