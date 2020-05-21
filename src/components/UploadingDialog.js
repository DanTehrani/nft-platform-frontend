import React, { Component } from 'react';
import {
  withStyles,
  Dialog,
	DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  LinearProgress,
  Typography
} from '@material-ui/core';

const styles = {
  button: {
    backgroundColor: 'blue'
  }
}

class UploadingDialog extends Component {
	render() {
    const {
      open,
      onCancelClick,
      classes
    } = this.props;

		return (
			<div className='dialog'>
				<Dialog open={open}>
          <DialogTitle>
            Uploading
          </DialogTitle>
          <DialogContent>
            <LinearProgress color='primary'/>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='primary' onClick={onCancelClick}>cancel</Button>
          </DialogActions>
        </Dialog>
      </div>

    )
  }
}

export default withStyles(styles)(UploadingDialog);
