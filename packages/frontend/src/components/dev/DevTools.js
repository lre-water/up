import React, { useState } from "react";
import styled from "styled-components/macro";

import {
  Box,
  Drawer as MuiDrawer,
  Fab as MuiFab,
  ListItem,
} from "@mui/material";

import { Alert } from "@mui/material";

import { Code as MuiFabIcon } from "@mui/icons-material";

import Tooltip from "@mui/material/Tooltip";
import { opacify } from "polished";
import DevToolsAccordion from "./DevToolsAccordion";
import Typography from "@mui/material/Typography";

const FabIcon = styled(MuiFabIcon)`
  color: ${(props) => props.theme.palette.text.primary};
`;

const Fab = styled(MuiFab)`
  position: fixed;
  right: ${(props) => props.theme.spacing(8)};
  bottom: ${(props) => props.theme.spacing(8)};
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Heading = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

const Drawer = styled(MuiDrawer)`
  .MuiDrawer-paper {
    width: 60% !important;
    background-color: ${(props) =>
      opacify(-0.2, props.theme.palette.background.paper)};
  }

  .MuiDrawer-paper {
    ${(props) => props.theme.breakpoints.down("md")} {
      width: 80% !important;
    }
    ${(props) => props.theme.breakpoints.down("sm")} {
      width: 100% !important;
    }
  }
`;

function DevToolsDrawer({ onCloseClick }) {
  return (
    <Wrapper>
      <Heading button={true} onClick={onCloseClick}>
        Developer Tools (click to close)
      </Heading>

      <Box px={4} my={3}>
        <Alert icon={false} severity="info">
          <strong>Notice!</strong> This drawer is only visible to Developers.
        </Alert>
      </Box>

      <Box px={4} my={3}>
        <DevToolsAccordion />
      </Box>
    </Wrapper>
  );
}

function TriggerButton({ type, toggleDrawer }) {
  if (type === "fab")
    return (
      <Fab color="primary" aria-label="Edit" onClick={toggleDrawer(true)}>
        <FabIcon />
      </Fab>
    );

  if (type === "icon") return <FabIcon onClick={toggleDrawer(true)} />;

  return (
    <Typography
      color="textSecondary"
      variant={"h5"}
      onClick={toggleDrawer(true)}
      gutterBottom
    >
      &pi;
    </Typography>
  );
}

function DevTools({ type = "pi" }) {
  const [state, setState] = useState({
    isOpen: false,
  });

  const toggleDrawer = (open) => () => {
    setState({ ...state, isOpen: open });
  };

  return (
    <div>
      <Tooltip title="Open Developer Tools">
        <div style={{ display: "flex", alignItems: "center" }}>
          <TriggerButton type={type} toggleDrawer={toggleDrawer} />
        </div>
      </Tooltip>
      <Drawer anchor="right" open={state.isOpen} onClose={toggleDrawer(false)}>
        <DevToolsDrawer onCloseClick={toggleDrawer(false)} />
      </Drawer>
    </div>
  );
}

export default DevTools;
