import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AddPecaModal from '../molecules/AddPecaModal';

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
        <AddPecaModal
          open={open}
          onClose={handleClose}
          onAddPeca={handleAddPeca}
          newPecaName={newPecaName}
          setNewPecaName={setNewPecaName}
        />
      </Box>
    </Container>
  );
}

export default Home;
