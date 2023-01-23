import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider as UrGraphQlProvider } from "urql";

import HomePage from "./pages/HomePage";
import urqlClient from "./UrqlClient";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <UrGraphQlProvider value={urqlClient}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UrGraphQlProvider>
    </BrowserRouter>
  );
}

export default App;
