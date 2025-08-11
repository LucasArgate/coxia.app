import React from 'react';
import { Button, Modal, Box, TextField, Checkbox, FormControlLabel, Typography } from '@mui/material';

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

const cores = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

function AtorModal({ open, onClose, onAddAtor, newAtorName, setNewAtorName, newAtorMeu, setNewAtorMeu, newAtorCor, setNewAtorCor }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Adicionar Ator
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Nome do Ator"
          type="text"
          fullWidth
          variant="standard"
          value={newAtorName}
          onChange={(e) => setNewAtorName(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={newAtorMeu} onChange={(e) => setNewAtorMeu(e.target.checked)} />}
          label="Meu Ator?"
        />
        <div>
          {cores.map((cor) => (
            <div
              key={cor}
              onClick={() => setNewAtorCor(cor)}
              style={{
                backgroundColor: cor,
                width: '20px',
                height: '20px',
                display: 'inline-block',
                cursor: 'pointer',
                border: newAtorCor === cor ? '2px solid black' : 'none',
              }}
            ></div>
          ))}
        </div>
        <Box sx={{ mt: 2 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onAddAtor}>Adicionar</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AtorModal;
