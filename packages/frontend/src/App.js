import React from "react";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DateFnsUtils from "@mui/lab/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "styled-components/macro";
import { StyledEngineProvider } from "@mui/material/styles";

import { create } from "jss";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import jssPreset from "@mui/styles/jssPreset";
import StylesProvider from "@mui/styles/StylesProvider";

import createTheme from "./theme";
import Routes from "./routes/Routes";

const queryClient = new QueryClient();

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  const theme = useSelector((state) => state.themeReducer);

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Helmet
            titleTemplate="%s | LRE Water"
            defaultTitle="LRE Water - Unified Platform"
          />
          <StylesProvider jss={jss}>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <StyledEngineProvider>
                <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
                  <ThemeProvider theme={createTheme(theme.currentTheme)}>
                    <Routes />
                  </ThemeProvider>
                </MuiThemeProvider>
              </StyledEngineProvider>
            </LocalizationProvider>
          </StylesProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
