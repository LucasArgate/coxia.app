import React from 'react';
import { Grid, IconButton } from '@mui/material';
import { RecordVoiceOver, Stop, PlayCircleOutline, School } from '@mui/icons-material';

function PlayerControls({ isRecording, startRecording, stopRecording, playAll, train, selectedAtor, falas }) {
  return (
    <Grid container spacing={2} alignItems="center">
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
  );
}

export default PlayerControls;
