import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider as UrGraphQlProvider } from "urql";

import CharacterDrawer from "./components/CharacterDrawer";
import useCharacterDrawerFacade from "./facades/useCharacterDrawerFacade";
import HomePage from "./pages/HomePage";
import theme from "./theme";
import urqlClient from "./UrqlClient";

function App() {
  const { characterId } = useCharacterDrawerFacade();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UrGraphQlProvider value={urqlClient}>
          {characterId && <CharacterDrawer />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </UrGraphQlProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
