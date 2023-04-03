import { DivRegister, Error, Main, StyledForm, Title } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as yup from "yup";

const RegisterPage = () => {
  const { registerFunc } = useContext(UserContext);

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Precisa conter 8 caracteres, Uma letra maiúscula, Uma minúscula, Um número e Um símbolo."
      ),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("passoword")], "Deve ser idêntica a senha original")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Precisa conter 8 caracteres, Uma letra maiúscula, Uma minúscula, Um número e Um símbolo."
      ),
    tel: yup.string().required("Telefone obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();

  return (
    <Main>
      <DivRegister>
        <button onClick={() => navigate("/login", { replace: true })}>
          Voltar
        </button>
      </DivRegister>
      <StyledForm onSubmit={handleSubmit(registerFunc)}>
        <div>
          <h1>Crie sua conta</h1>
          <Title>Rapido e grátis, vamos nessa!</Title>
        </div>
        <span>Nome</span>
        <input placeholder="Digite aqui seu nome" {...register("name")} />
        <Error>{errors.name?.message}</Error>
        <span>Email</span>
        <input placeholder="Digite aqui seu email" {...register("email")} />
        <Error>{errors.email?.message}</Error>
        <span>Senha</span>
        <input
          type="password"
          placeholder="Digite aqui seu senha"
          {...register("password")}
        />
        <Error>{errors.password?.message}</Error>
        <span>Confirme sua senha</span>
        <input type="password" placeholder="Confirme aqui seu senha" />
        <Error>{errors.password?.message}</Error>
        <span>Telefone</span>
        <input placeholder="Digite aqui seu telefone" {...register("tel")} />
        <Error>{errors.tel?.message}</Error>
        <button type="submit">Cadastrar</button>
      </StyledForm>
    </Main>
  );
};

export default RegisterPage;
