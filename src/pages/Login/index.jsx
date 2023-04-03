import {
  StyledFormLogin,
  StyledMain,
  RegisterContainer,
  Container,
  StyledTitle,
  StyledSpan,
  UserContainer,
  TextContainer,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const formSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <StyledMain>
      <Container>
        <TextContainer>
          <StyledTitle>
            Uma maneira mais facíl de gerenciar seus contatos!
          </StyledTitle>
          <StyledSpan>ContactsHub</StyledSpan>
        </TextContainer>
        <UserContainer>
          <StyledFormLogin onSubmit={handleSubmit(login)}>
            <div>
              <h1>Login</h1>
            </div>
            <span>Email</span>
            <input placeholder="Digite seu email aqui" {...register("email")} />
            <h4>{errors.email?.message}</h4>
            <span>Senha</span>
            <input
              placeholder="Digite sua senha aqui"
              type="password"
              {...register("password")}
            />
            <h4>{errors.password?.message}</h4>
            <button type="submit">Entrar</button>
          </StyledFormLogin>
          <RegisterContainer>
            <p>Ainda não possui uma conta?</p>
            <button onClick={() => navigate("/register", { replace: true })}>
              Cadastre-se
            </button>
          </RegisterContainer>
        </UserContainer>
      </Container>
    </StyledMain>
  );
};

export default LoginPage;
