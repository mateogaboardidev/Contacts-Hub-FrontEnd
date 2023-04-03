import {
  Container,
  ContainerInfo,
  Containeritem,
  ContainerModules,
  ContainerModulesHeader,
  StyledHeader,
  StyledMain,
} from "./styles";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import plus from "./plus.png";
import ContactList from "../../Components/ContactList";
import AddModal from "../../Components/AddModal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const { user, loading } = useContext(UserContext);

  function logout() {
    window.localStorage.clear();
    navigate("/login", { replace: true });
  }

  if (loading) return <StyledMain />;

  return user ? (
    <>
      <StyledHeader>
        <Container>
          <button onClick={logout}>Logout</button>
        </Container>
      </StyledHeader>
      <StyledMain>
        <ContainerInfo>
          <div>
            <h1>Olá, {user.name}</h1>
            <p>{user.course_module}</p>
          </div>
        </ContainerInfo>
        <ContainerModulesHeader>
          <div>
            <h2>Contatos</h2>
            <button onClick={() => setOpenModal(true)}>
              <img src={plus} alt="Adicionar" />
            </button>
          </div>
        </ContainerModulesHeader>
        <ContainerModules>
          <Containeritem>
            <ContactList user={user} />
          </Containeritem>
        </ContainerModules>
        {openModal && <AddModal closeModal={setOpenModal} />}
      </StyledMain>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Dashboard;
