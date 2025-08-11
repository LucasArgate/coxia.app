import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Box, TextField, Select, MenuItem, Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemText, Container, Typography, Grid } from '@mui/material';
import { RecordVoiceOver, Stop, PlayArrow, Pause, PlayCircleOutline, School } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

function Peca() {
  const { id } = useParams();
  const [pecaNome, setPecaNome] = useState(`Peça ${id}`);
  const [atores, setAtores] = useState([{id: 1, nome: 'Ator de Teste', meu: true, cor: '#FF0000'}]);
  const [selectedAtor, setSelectedAtor] = useState(atores[0]);
  const [open, setOpen] = useState(false);
  const [newAtorName, setNewAtorName] = useState('');
  const [newAtorMeu, setNewAtorMeu] = useState(false);
  const [newAtorCor, setNewAtorCor] = useState(cores[0]);

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [falas, setFalas] = useState([]);

  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [currentFalaIndex, setCurrentFalaIndex] = useState(0);
  const audioPlayer = useRef(null);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddAtor = () => {
    if (newAtorName.trim() !== '') {
      const newAtor = {
        id: atores.length + 1,
        nome: newAtorName,
        meu: newAtorMeu,
        cor: newAtorCor,
      };
      setAtores([...atores, newAtor]);
      if (!selectedAtor) {
        setSelectedAtor(newAtor);
      }
      setNewAtorName('');
      setNewAtorMeu(false);
      setNewAtorCor(cores[0]);
      handleClose();
    }
  };

  const startRecording = async () => {
    if (!selectedAtor) {
      alert('Selecione um ator para gravar a fala.');
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      setAudioChunks((prev) => [...prev, event.data]);
    };
    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(audioBlob);
      const newFala = {
        id: `fala-${falas.length + 1}`,
        ator: selectedAtor,
        audioURL: url,
      };
      setFalas([...falas, newFala]);
      setAudioChunks([]);
    };
    setMediaRecorder(recorder);
    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(falas);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFalas(items);
  };

  const playAll = () => {
    setIsPlayingAll(true);
    setIsTraining(false);
    setCurrentFalaIndex(0);
  };

  const train = () => {
    setIsPlayingAll(true);
    setIsTraining(true);
    setCurrentFalaIndex(0);
  };

  const handleEnded = () => {
    let nextIndex = currentFalaIndex + 1;
    if (isTraining) {
      while (nextIndex < falas.length && falas[nextIndex].ator.meu) {
        nextIndex++;
      }
    }

    if (nextIndex < falas.length) {
      setCurrentFalaIndex(nextIndex);
    } else {
      setIsPlayingAll(false);
      setIsTraining(false);
    }
  };

  useEffect(() => {
    if (isPlayingAll && audioPlayer.current) {
      if (isTraining && falas[currentFalaIndex].ator.meu) {
        handleEnded();
      } else {
        audioPlayer.current.play();
      }
    }
  }, [isPlayingAll, isTraining, currentFalaIndex]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {pecaNome}
        </Typography>
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
                <MenuItem key={ator.id} value={_ator}>
                  <span style={{ backgroundColor: ator.cor, width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></span>
                  {ator.nome}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Button onClick={handleOpen}>Adicionar Ator</Button>
          </Grid>
          <Grid item>
            <IconButton onClick={isRecording ? stopRecording : startRecording} disabled={!selectedAtor}>
              {isRecording ? <Stop /> : <RecordVoiceOver />}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={playAll} disabled={falas.length === 0}>
              <PlayCircleOutline />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={train} disabled={falas.length === 0}>
              <School />
            </IconButton>
          </Grid>
        </Grid>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="falas">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {falas.map((fala, index) => (
                  <Draggable key={fala.id} draggableId={fala.id} index={index}>
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, backgroundColor: fala.ator.cor + '33' }}
                      >
                        <ListItemText primary={fala.ator.nome} />
                        <audio
                          ref={index === currentFalaIndex ? audioPlayer : null}
                          src={fala.audioURL}
                          controls={!isPlayingAll}
                          onEnded={handleEnded}
                        />
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>

        <Modal open={open} onClose={handleClose}>
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
              <Button onClick={handleClose}>Cancelar</button>
              <Button onClick={handleAddAtor}>Adicionar</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default Peca;
