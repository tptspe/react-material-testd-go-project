import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { closeDialog } from 'actions/dialogAlert';

const Alert = props => {

  const { open, title, subTitle, message, closeDialog } = props;

  const handleClose = () => {
    closeDialog();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
            <br></br>
            {subTitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.string,
  closeDialog: PropTypes.func.isRequired,
};

export default connect(null, { closeDialog })(Alert)