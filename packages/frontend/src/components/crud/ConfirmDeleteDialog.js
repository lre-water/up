import { useApp } from "../../AppProvider";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { deleteRecord } from "../../redux/actions/crudActions";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { DIALOG_TYPES } from "../../constants";

const dialogKey = DIALOG_TYPES.DELETE;

export function ConfirmDeleteDialog({
  modelName,
  open,
  setOpen,
  config,
  afterDelete = () => {},
}) {
  const dispatch = useDispatch();
  const { confirmDialogKey, confirmDialogPayload, doToast } = useApp();
  const { getAccessTokenSilently } = useAuth0();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    handleClose();

    try {
      const token = await getAccessTokenSilently();
      await dispatch(deleteRecord(modelName, confirmDialogPayload, token));
      afterDelete(confirmDialogPayload);
      doToast("success", "Record was deleted successfully.");
    } catch (error) {
      const message = error?.message ?? "Something went wrong";
      doToast("error", message);
    }
  };

  if (!confirmDialogPayload) return <React.Fragment />;
  return (
    <Dialog open={confirmDialogKey === dialogKey && open} onClose={handleClose}>
      <DialogTitle style={{ textAlign: "center" }}>
        {"Delete Record"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textAlign: "center" }}>
          Are you sure you want to delete{" "}
          <strong>{config.displayName(confirmDialogPayload)}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="outlined"
          onClick={handleAgree}
          className="error"
          autoFocus
        >
          Yes, delete record
        </Button>
      </DialogActions>
    </Dialog>
  );
}
