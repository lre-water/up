import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Tooltip from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";

const options = ["Save", "Save & Close", "Save & Create New"];

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

export default function SplitSaveButton({
  onClick,
  onCloseClick,
  onNewClick,
  formIsDirty = false,
  formIsSubmitting = false,
  isFetching = false,
  numMismatches,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [formIsClean, setFormIsClean] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(
    parseInt(localStorage.getItem("crudViewSplitSaveIndex") ?? 0)
  );

  const handleClick = (index) => {
    if (index === 0) onClick();
    if (index === 1) onCloseClick();
    if (index === 2) onNewClick();
  };

  const handleMenuItemClick = (event, index) => {
    localStorage.setItem("crudViewSplitSaveIndex", index);
    setSelectedIndex(index);
    setOpen(false);
    setTimeout(() => {
      handleClick(index);
    }, 1);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setFormIsClean(
      numMismatches === 0 || (numMismatches === 0 && !formIsDirty)
    );
  }, [numMismatches, formIsDirty]);

  return (
    <Grid item {...props}>
      <GridButtonWrap item xs={12}>
        <Tooltip title={formIsClean ? "No changes to save." : ""}>
          <ButtonGroup
            variant="contained"
            color="primary"
            ref={anchorRef}
            aria-label="split save button"
            disabled={formIsClean || formIsSubmitting || isFetching}
          >
            <Button
              fullWidth
              onClick={() => {
                handleClick(selectedIndex);
              }}
              startIcon={
                formIsSubmitting ? (
                  <CircularProgress style={{ width: "14px", height: "14px" }} />
                ) : null
              }
            >
              {formIsSubmitting && <span>Submitting...</span>}
              {!formIsSubmitting && <span>{options[selectedIndex]}</span>}
            </Button>
            <Button
              color="primary"
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select save action"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
        </Tooltip>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
          style={{
            zIndex: 1,
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </GridButtonWrap>
    </Grid>
  );
}
