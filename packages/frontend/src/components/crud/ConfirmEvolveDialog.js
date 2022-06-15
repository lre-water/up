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

const dialogKey = DIALOG_TYPES.EVOLVE;

function ConfirmEvolveDialog({ open, setOpen }) {
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
    <Dialog
      maxWidth="xs"
      open={confirmDialogKey === dialogKey && open}
      onClose={handleClose}
    >
      <DialogTitle style={{ textAlign: "center" }}>
        {"Evolve Record"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            textAlign: "center",
            padding: `0 ${isWidthDownXs ? 20 : 40}px`,
          }}
        >
          Evolving a record re-applies any published changes that were reverted
          during a devolve.
          <br />
          <br />
          Are you sure you want to evolve this record?
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
          Yes, re-apply changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmEvolveDialog;
