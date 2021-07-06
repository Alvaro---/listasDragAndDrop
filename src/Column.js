import React, { Component } from 'react'
import styled from "styled-components";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color:white;
    border-radius: 2px;
    width:220px;

    display:flex;
    flex-direction:column;

    `;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.4s ease;
    background-color: ${props => (props.isDragginOver ? 'skyblue' : 'inherit')};

    flex-grow:1;
    min-height: 100px;
`;

export default class Column extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Title
                        {...provided.dragHandleProps}
                        >{this.props.column.title}</Title>
                        <Droppable droppableId={this.props.column.id} type="column"
                            // direction ="vertical" - "horizontal"
                            //type="TASK"
                            //type={this.props.column.id === 'column-3' ? 'done' : 'active'} bloquea el drag a la columna 3
                            isDropDisabled={this.props.isDropDisabled} //onDrag Start del dndcontainer
                        >
                            {(provided, snapshot) => (  ////proveded necesario. snapshot-> efectos //dropableSnapshot: isDragginOver: true, DragginOverWhidt: 'task-#'
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDragginOver={snapshot.isDraggingOver}
                                >
                                    {this.props.tasks.map((task, index) =>
                                        <Task
                                            key={task.id}
                                            task={task}
                                            index={index} />
                                    )}
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        );

    }
}
