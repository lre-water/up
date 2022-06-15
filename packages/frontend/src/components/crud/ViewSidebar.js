import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Grid,
  IconButton as MuiIconButton,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ViewSidebarContent from "./ViewSidebarContent";

const IconButton = styled(MuiIconButton)`
  &.MuiIconButton-root {
    margin-right: ${(props) => props.theme.spacing(4)};
  }
`;

const ContentWrap = styled.div`
  width: 240px;
  height: 100%;
  background-color: ${(props) => props.theme.palette.background.toolbar2};
  border-left: 1px solid
    ${(props) =>
      props.theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(0, 0, 0, 0.12)"};
  padding: ${(props) => props.theme.spacing(4)};

  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const SidebarButton = styled(IconButton)`
  &.MuiButtonBase-root {
    position: absolute;
    top: 20px;
    width: 24px;
    height: 24px;
    border: 1px solid
      ${(props) =>
        props.theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.2)"};
    background-color: ${(props) =>
      props.theme.palette.background.default} !important;

    &:hover {
      background-color: ${(props) =>
        props.theme.palette.background.toolbar} !important;
    }
  }
`;

const SidebarToggleButtonExpanded = styled(SidebarButton)`
  &.MuiButtonBase-root {
    left: -15px;
  }
`;

const SidebarToggleButtonCollapsed = styled(SidebarButton)`
  &.MuiButtonBase-root {
    right: -16px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export function ViewSidebar({
  modelName,
  data,
  handleVersionViewClick,
  currentVersion,
}) {
  const theme = useTheme();
  const isWidthDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("isCrudViewSidebarOpen")) ?? true
  );

  const toggleOpen = () => {
    localStorage.setItem("isCrudViewSidebarOpen", (!isSidebarOpen).toString());
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Grid item style={{ position: "relative" }}>
      {isWidthUpSm && (
        <>
          {isSidebarOpen && (
            <SidebarToggleButtonExpanded onClick={toggleOpen}>
              <ChevronRight />
            </SidebarToggleButtonExpanded>
          )}
          {!isSidebarOpen && (
            <SidebarToggleButtonCollapsed onClick={toggleOpen}>
              <ChevronLeft />
            </SidebarToggleButtonCollapsed>
          )}
        </>
      )}
      <Slide
        timeout={0}
        direction="left"
        in={isSidebarOpen || isWidthDownXs}
        mountOnEnter
        unmountOnExit
      >
        <ContentWrap>
          <ViewSidebarContent
            modelName={modelName}
            data={data}
            currentVersion={currentVersion}
            handleVersionViewClick={handleVersionViewClick}
          />
        </ContentWrap>
      </Slide>
    </Grid>
  );
}
