import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

function App() {
  const data = [
    {
      id: '1',
      name: 'Bob'
    },
    {
      id: '2', 
      name: 'Hank'
    },
    {
      id: '3',
      name: 'Dale'
    }
  ]
  
  const [characterList, setList] = useState(data);
  
  // Reorder array for new character positions
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    return result;  
  }
  
  // Call this function when the drag/drop behavior is completed
  const onEnd = (result) => {
    //console.log(result);
    setList(reorder(characterList, result.source.index, result.destination.index));
  }
  
  return (
    <div className="App">
      <header className="app__header">
        <h1>React DND</h1>
      </header>
      <DragDropContext onDragEnd={onEnd}>
        <Droppable droppableId="123">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {
                characterList.map((item, index) => 
                  (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="item" >
                          { item.name }
                        </div>
                      )}                      
                    </Draggable>
                  )
                )
              }
              {provided.placeholder}    
            </div>
          )}                
        </Droppable> 
      </DragDropContext>
    </div>
  );
}

export default App;
