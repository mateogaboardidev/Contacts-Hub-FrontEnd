import { useState } from "react";
import { StyledContactList } from "./styles";
import ListItem from "../ListItem";

const ContactList = ({ user }) => {
  const [contacts, setContacts] = useState(user.contacts);
  return (
    <StyledContactList>
      {contacts.map((contact, index) => (
        <ListItem
          key={index}
          name={contact.name}
          email={contact.email}
          tel={contact.tel}
          contactId={contact.id}
        />
      ))}
    </StyledContactList>
  );
};

export default ContactList;
