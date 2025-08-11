import React, { useState } from 'react';
import { Button, Modal, Box, TextField, List, ListItem, ListItemText, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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

function Home() {
  const [open, setOpen] = useState(false);
  const [pecas, setPecas] = useState([{id: 1, nome: 'Peça de teste'}]);
  const [newPecaName, setNewPecaName] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddPeca = () => {
    if (newPecaName.trim() !== '') {
      setPecas([...pecas, { id: pecas.length + 1, nome: newPecaName }]);
      setNewPecaName('');
      handleClose();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Minhas Peças
        </Typography>
        <Button variant="contained" onClick={handleOpen}>Adicionar Peça</Button>
        <List>
          {pecas.map((peca) => (
            <ListItem button key={peca.id} component={Link} to={`/peca/${peca.id}`}>
              <ListItemText primary={peca.nome} />
            </ListItem>
          ))}
        </List>
        <Modal
          open={open}
          onClose={handleClose}
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
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleAddPeca}>Adicionar</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default Home;
