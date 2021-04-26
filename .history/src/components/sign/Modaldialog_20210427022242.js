import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import Form from './Form';

import Sign from './Sign';
const ModalDialog = () => {
    return (
        <div>
            <Sign/>
        <Dialog open={open} onClose={handleClose}>
      {/* // form to be created */}
      <Form handleClose={handleClose} />
    </Dialog>
        </div>
    )
}

export default ModalDialog
