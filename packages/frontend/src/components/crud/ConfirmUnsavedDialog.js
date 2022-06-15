import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { DIALOG_TYPES } from "../../constants";
import { useHistory } from "react-router-dom";
import { useApp } from "../../AppProvider";
import { useCrud } from "../../CrudProvider";

const dialogKey = DIALOG_TYPES.UNSAVED;

export function ConfirmUnsavedDialog({ modelName, open, setOpen }) {
  const history = useHistory();
  const crud = useCrud();
  const { confirmDialogKey } = useApp();
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    handleClose();
    history.push(`${crud.getModelBasePath()}`);
  };

  return (
    <Dialog open={confirmDialogKey === dialogKey && open} onClose={handleClose}>
      <DialogTitle style={{ textAlign: "center" }}>
        {"Unsaved Changes Detected"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textAlign: "center" }}>
          Are you sure you want to leave this page?
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
          Yes, discard changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
