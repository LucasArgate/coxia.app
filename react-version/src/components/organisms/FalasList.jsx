import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function FalasList({ falas, onDragEnd, isPlayingAll, currentFalaIndex, audioPlayer, handleEnded }) {
  return (
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
  );
}

export default FalasList;
