import React from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddPecaModal({ open, onClose, onAddPeca, newPecaName, setNewPecaName }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Adicionar Peça
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome da Peça"
          type="text"
          fullWidth
          variant="standard"
          value={newPecaName}
          onChange={(e) => setNewPecaName(e.target.value)}
        />
        <Box sx={{ mt: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onAddPeca}>Adicionar</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddPecaModal;
