import React from 'react';
import { Grid, Select, MenuItem, Button } from '@mui/material';

function AtorSelector({ atores, selectedAtor, setSelectedAtor, handleOpen }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Select
          value={selectedAtor}
          onChange={(e) => setSelectedAtor(e.target.value)}
          displayEmpty
        >
          <MenuItem value={null} disabled>
            Selecione um ator
          </MenuItem>
          {atores.map((ator) => (
            <MenuItem key={ator.id} value={ator}>
              <span style={{ backgroundColor: ator.cor, width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></span>
              {ator.nome}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Button onClick={handleOpen}>Adicionar Ator</Button>
      </Grid>
    </Grid>
  );
}

export default AtorSelector;
