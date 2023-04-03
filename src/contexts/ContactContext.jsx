import { createContext } from "react";
import api from "../services/api";

export const ContactContext = createContext({});

const ContactProvider = ({ children }) => {
  const createContact = async (data) => {
    const response = await api.post("", data);
    const { token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;
    window.location.reload(true);
  };

  const deleteContact = async (id) => {
    const response = await api.delete("");
    const { token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;
    window.location.reload(true);
  };

  return (
    <ContactContext.Provider value={{ createContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
