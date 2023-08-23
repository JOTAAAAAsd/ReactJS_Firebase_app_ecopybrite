import { Header } from "./Components/UI/HeaderAndNavbar";
import { AppRouting } from "./Components/AppRouting";

import "./statics/css/App.css";
import { ModalAppProvider } from "./Hooks/_Context/ModalAppContext";
import { AuthUserProvider } from "./Hooks/_Context/AuthUserContext";

function App() {

  return (

    <AuthUserProvider>
      <ModalAppProvider>
        <AppRouting />
      </ModalAppProvider>
    </AuthUserProvider>

  );
}

export default App;
