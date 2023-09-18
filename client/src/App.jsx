import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import IndexPage from "./pages/IndexPage/IndexPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import ForumPage from "./pages/ForumPage/ForumPage"

export default function App() {
  return (
    <BrowserRouter>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/forum" element={<ForumPage />}/>
            </Route>
          </Routes>
        </CssBaseline>
    </BrowserRouter>
  );
}
