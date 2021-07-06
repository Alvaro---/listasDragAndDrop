import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from "./initial-data";
import Column from "./Column";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
`;


class App extends React.Component {
  state = initialData;

  onDragStart = (start) => {
    document.body.style.color = 'orange';
    //para el efecto del onDragUpdate
    document.body.style.transition = 'background-color 0.3s ease'

    //para desabilitar una columna
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId)

    this.setState({
      homeIndex,
    })
  };

  onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination ?
      destination.index / Object.keys(this.state.tasks).length
      :
      0
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  onDragEnd = (result) => {

    this.setState({
      homeIndex: null,
    })

    //Terminar los efectos de color
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    const { destination, source, draggableId, type } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return


    //MOVIMIENTO DE COLUMNA
   /* if (type==='column'){
      const newColumnOrder=Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index,0, draggableId);

      const newState={
        ...this.state,
        columnOrder: newColumnOrder
      };
      this.setState(newState);
      return;
    }*/

    //Una columna const column = this.state.columns[source.droppableId];
    //const newTaskIds = Array.from(column.taskIds);

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      // si es en una columna la pregunta no es necesaria. Solo lo del if. 
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        //...column,
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    //movin fron one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      },
    };

    this.setState(newState);
    return;

  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}      //send an start: draggableId, type source: {dropableId, index}
        onDragUpdate={this.onDragUpdate}  //send an update: ...start, destination: {dropableId, index}
        onDragEnd={this.onDragEnd} //oblgatorio
      >
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
        
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >

              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                const isDropDisabled = index < this.state.homeIndex;

                return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} index={index}/>
              })}
            {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
