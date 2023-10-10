import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import LoginPage from "./pages/LoginPage/LoginPage"
import ForumPage from "./pages/ForumPage/ForumPage"
import TimetablePage from "./pages/TimetablePage/TimetablePage";
import MissingPage from "./pages/MissingPage/MissingPage"

export default function App() {
  return (
    <BrowserRouter>
        <CssBaseline>
          <Routes>
            <Route exact path="/" element={<Layout />}>
              <Route exact index element={<TimetablePage />}/>
              <Route exact path="/login" element={<LoginPage />}/>
              <Route exact path="/forum" element={<ForumPage />}/>
              <Route exact path="/swap" element={<ForumPage />}/>
              <Route exact path="/ballot" element={<ForumPage />}/>
              <Route exact path="*" element={<MissingPage />}/>

            </Route>
          </Routes>
        </CssBaseline>
    </BrowserRouter>
  );
}
