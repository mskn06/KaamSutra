import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function FormDialog(props) {
    const { open, handleClose, fields, title, text, primaryAction } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
                {fields.map(item => item)}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={primaryAction} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FormDialog;
