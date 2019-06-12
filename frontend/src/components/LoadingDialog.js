import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

function FormDialog(props) {
    const { open } = props;

    return (
        <Dialog
            open={open}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle id="form-dialog-title">Loading</DialogTitle>
            <DialogContent>
                <DialogContentText
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <CircularProgress style={{ marginRight: 16 }} />
                    Please wait...
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default FormDialog;
