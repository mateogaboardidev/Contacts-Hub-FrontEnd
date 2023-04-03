import { CreateBtn, StyledAddModal, Error } from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import * as yup from "yup";

const AddModal = ({ closeModal }) => {
  const { createContact } = useContext(ContactContext);

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    tel: yup.string().required("Telefone obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <StyledAddModal onSubmit={handleSubmit(createContact)}>
      <div>
        <h3>Cadastrar contato</h3>
        <button onClick={() => closeModal(false)}>X</button>
      </div>
      <span>Nome</span>
      <input placeholder="Nome do contato" {...register("name")} />
      <Error>{errors.name?.message}</Error>
      <span>Email</span>
      <input placeholder="Email do contato" {...register("email")} />
      <Error>{errors.email?.message}</Error>
      <span>Telefone</span>
      <input placeholder="Telefone do contato" {...register("tel")} />
      <Error>{errors.tel?.message}</Error>
      <CreateBtn type="submit">Cadastrar</CreateBtn>
    </StyledAddModal>
  );
};

export default AddModal;
