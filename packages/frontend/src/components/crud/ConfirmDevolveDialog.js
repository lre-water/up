import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DIALOG_TYPES } from "../../constants";
import { useApp } from "../../AppProvider";
import { useMediaQuery, useTheme } from "@mui/material";

const dialogKey = DIALOG_TYPES.DEVOLVE;

function ConfirmDevolveDialog({ open, setOpen }) {
  const theme = useTheme();
  const isWidthDownXs = useMediaQuery(theme.breakpoints.down("xs"));

  const { confirmDialogKey, confirmDialogPayload, confirmDialogCallback } =
    useApp();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    handleClose();
    confirmDialogCallback(confirmDialogPayload);
  };

  return (
    <Dialog open={confirmDialogKey === dialogKey && open} onClose={handleClose}>
      <DialogTitle style={{ textAlign: "center" }}>
        {"Devolve Record"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            textAlign: "center",
            padding: `0 ${isWidthDownXs ? 20 : 40}px`,
          }}
        >
          Devolving reverts a record to its previously published state.
          <br />
          <br />
          Are you sure you want to devolve this record?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="outlined"
          onClick={handleAgree}
          color="primary"
          autoFocus
        >
          Yes, revert changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDevolveDialog;
