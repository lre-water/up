import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { CRUD_DISPLAY_MODES } from "../../constants";
import {
  ViewHeadline as TableModeIcon,
  ViewModule as CardModeIcon,
  ViewStream as ListModeIcon,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components/macro";
import Button from "@mui/material/Button";
import { darken, Grid, lighten } from "@mui/material";

const ToggleWrap = styled(Grid)`
  text-align: right;
  margin-right: 16px;

  ${(props) => props.theme.breakpoints.down("sm")} {
    text-align: left;
  }
`;

const ToggleButton = styled(Button)`
  width: 40px;
  min-width: 40px;
  background-color: ${(props) => props.theme.palette.background.toolbar};

  &.active {
    background-color: ${(props) =>
      props.theme.palette.mode === "dark"
        ? lighten(props.theme.palette.background.toolbar, 0.15)
        : darken(props.theme.palette.background.toolbar, 0.15)};
  }
`;

export function ResultsDisplayModeToggle({
  displayMode,
  setDisplayMode,
  modelName,
}) {
  return (
    <ToggleWrap item xs={12}>
      <ButtonGroup aria-label="outlined primary button group">
        <Tooltip title="Table View">
          <ToggleButton
            variant="outlined"
            className={{ active: displayMode === CRUD_DISPLAY_MODES.TABLE }}
          >
            <TableModeIcon
              onMouseDown={() => {
                localStorage.setItem(
                  `crudViewResultDisplayMode_${modelName}`,
                  CRUD_DISPLAY_MODES.TABLE
                );
                setDisplayMode(CRUD_DISPLAY_MODES.TABLE);
              }}
            />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="List View">
          <ToggleButton
            variant="outlined"
            className={{ active: displayMode === CRUD_DISPLAY_MODES.LIST }}
          >
            <ListModeIcon
              onMouseDown={() => {
                localStorage.setItem(
                  `crudViewResultDisplayMode_${modelName}`,
                  CRUD_DISPLAY_MODES.LIST
                );
                setDisplayMode(CRUD_DISPLAY_MODES.LIST);
              }}
            />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Card View">
          <ToggleButton
            variant="outlined"
            className={{ active: displayMode === CRUD_DISPLAY_MODES.CARD }}
          >
            <CardModeIcon
              onMouseDown={() => {
                localStorage.setItem(
                  `crudViewResultDisplayMode_${modelName}`,
                  CRUD_DISPLAY_MODES.CARD
                );
                setDisplayMode(CRUD_DISPLAY_MODES.CARD);
              }}
            />
          </ToggleButton>
        </Tooltip>
      </ButtonGroup>
    </ToggleWrap>
  );
}
