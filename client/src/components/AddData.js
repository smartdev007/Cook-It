import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddData({setOpen,open,data,setdata,adddata}) {

  const handleClose = () => {
    setOpen(false);
  };
  const getFile = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e[0]);
    reader.onload = (e) => {
        setdata({...data,images: reader.result});
    }
}
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Data</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(e) => setdata({...data,[e.target.name] : e.target.value})}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Content"
            name="content"
            type="text"
            fullWidth
            onChange={(e) => setdata({...data,[e.target.name] : e.target.value})}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="image"
            label="Content"
            type="file"
            fullWidth
            onChange={(e) => getFile(e.target.files)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
              adddata()
              handleClose()
          }} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}