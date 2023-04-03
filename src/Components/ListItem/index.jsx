import { useContext } from "react";
import { ContactContext } from "../../contexts/ContactContext";
import { StyledLi } from "./styles";

const ListItem = ({ title, status, contactId }) => {
  const { deleteContact } = useContext(ContactContext);

  return (
    <StyledLi>
      <h3>{title}</h3>
      <div>
        <p>{status}</p>
        <button onClick={() => deleteContact(contactId)}>Excluir</button>
      </div>
    </StyledLi>
  );
};

export default ListItem;
