import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertDialog = ({errMsg, setErrorMsg}) => {
    return (
        <Dialog
          open={errMsg.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setErrorMsg({msg:"", open :false})}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        //   fullWidth={true}
        //   maxWidth={'sm'}
        > 
          <DialogTitle id="alert-dialog-slide-title" variant="contained" color="primary"><ExclamationCircleOutlined />{" Warning"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" style={{color : 'red'}}>
              {errMsg.msg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setErrorMsg({msg:"", open :false})} variant="contained" color="secondary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
    );
  }