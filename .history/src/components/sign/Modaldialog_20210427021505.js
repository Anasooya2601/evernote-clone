import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import Form from './Form';
const ModalDialog = () => {
    return (
        <div>
        <Dialog open={open} onClose={handleClose}>
      // form to be created
      <Form handleClose={handleClose} />
    </Dialog>
        </div>
    )
}

export default ModalDialog
