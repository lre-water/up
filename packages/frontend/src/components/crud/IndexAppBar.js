import {
  AppBar as MuiAppBar,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as inflector from "inflected";
import { ResultsDisplayModeToggle } from "./ResultsDisplayModeToggle";
import React from "react";
import styled from "styled-components/macro";
import CreateModelButton from "./CreateModelButton";

const AppBar = styled(MuiAppBar)`
  min-height: 72px;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.background.toolbar};
  border-bottom: 1px solid
    ${(props) =>
      props.theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(0, 0, 0, 0.12)"};
  padding: ${(props) => props.theme.spacing(4)};

  ${(props) => props.theme.breakpoints.down("sm")} {
    max-height: none;
  }
`;

const GridButtonWrap = styled(Grid)`
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
    .MuiButtonGroup-root {
      width: 100%;

      & button:first-child {
        width: 100%;
      }
    }
  }
`;

function IndexAppBar({ modelName, displayMode, setDisplayMode }) {
  const theme = useTheme();
  const isWidthDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isWidthUpXs = useMediaQuery(theme.breakpoints.up("xs"));

  return (
    <AppBar
      color="default"
      mb={4}
      style={{
        position: "sticky",
        top: isWidthDownXs ? "56px" : "64px",
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{
          flexWrap: "nowrap",
          maxHeight: isWidthDownXs ? "none" : "39px",
        }}
      >
        <Grid
          item
          style={{
            flexBasis: "200%",
            paddingRight: theme.spacing(3),
            paddingLeft: theme.spacing(isWidthDownXs ? 0 : 4),
            width: isWidthUpXs ? "100%" : "auto",
          }}
        >
          <Typography variant="h5">
            {inflector.titleize(inflector.pluralize(modelName))}
          </Typography>
        </Grid>
        <Grid container item justifyContent={"space-between"}>
          <Grid
            container
            justifyContent="space-between"
            style={{ flexWrap: "nowrap" }}
          >
            <ResultsDisplayModeToggle
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
              modelName={modelName}
            />
            <GridButtonWrap item>
              <CreateModelButton modelName={modelName} />
            </GridButtonWrap>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default IndexAppBar;
