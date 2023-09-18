import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";

/**
 * Main application component.
 * @component
 */
export default function App() {
  return (
    <div>
      <h1>
        hello
      </h1>
    </div>
  );
}
