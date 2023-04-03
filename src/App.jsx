import ContactProvider from "./contexts/ContactContext";
import UserProvider from "./contexts/UserContext";
import RoutesMain from "./Routes";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <UserProvider>
      <ContactProvider>
        <GlobalStyle />
        <RoutesMain />
      </ContactProvider>
    </UserProvider>
  );
}

export default App;
