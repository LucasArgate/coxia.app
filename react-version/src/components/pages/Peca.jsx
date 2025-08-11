import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AtorSelector from '../molecules/AtorSelector';
import PlayerControls from '../organisms/PlayerControls';
import FalasList from '../organisms/FalasList';
import AtorModal from '../molecules/AtorModal';

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
        <AtorSelector
          atores={atores}
          selectedAtor={selectedAtor}
          setSelectedAtor={setSelectedAtor}
          handleOpen={handleOpen}
        />
        <PlayerControls
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          playAll={playAll}
          train={train}
          selectedAtor={selectedAtor}
          falas={falas}
        />
        <FalasList
          falas={falas}
          onDragEnd={onDragEnd}
          isPlayingAll={isPlayingAll}
          currentFalaIndex={currentFalaIndex}
          audioPlayer={audioPlayer}
          handleEnded={handleEnded}
        />
        <AtorModal
          open={open}
          onClose={handleClose}
          onAddAtor={handleAddAtor}
          newAtorName={newAtorName}
          setNewAtorName={setNewAtorName}
          newAtorMeu={newAtorMeu}
          setNewAtorMeu={setNewAtorMeu}
          newAtorCor={newAtorCor}
          setNewAtorCor={setNewAtorCor}
        />
      </Box>
    </Container>
  );
}

export default Peca;
