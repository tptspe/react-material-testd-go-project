import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@material-ui/core';
import { closeDialog } from 'actions/dialogAlert';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const Confirmation = props => {

  const { open, title, message, closeDialog } = props;

  const handleAction = () => {
    closeDialog();
  };

  const handleClose = () => {
    closeDialog();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleAction} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

Confirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.string,
  onAction: PropTypes.string,
  closeDialog: PropTypes.func.isRequired,
};

export default connect(null, { closeDialog })(Confirmation)