import { Dialog,DialogTitle,DialogContent } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function UploadModal(props) {
  const {openPopup,children,setOpenPopup} = props;
  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div>Upload your post</div>
        <CloseIcon onClick={()=>setOpenPopup(false)}/>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default UploadModal
