import React, { Component } from 'react'
import styled from "styled-components";
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border:1px solid lightgrey;
    border-radius:2px;
    padding: 8px;
    margin-botton:8px;
    background-color: ${props =>
        props.isDragDisabled ? 'lightgrey'
            :
            props.isDragging ? 'lightgreen' : 'white'};

    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
        outline: none;
        border-color:red;
    }

`;

const Handle = styled.div`
    width:20px;
    height:20px;
    background-color:orange;
    border-radius:5px;
`;

export default class extends Component {
    render() {

        const isDragDisabled = this.props.task.value === 'important'
        return (
            <div>
                <Draggable
                    draggableId={this.props.task.id}
                    index={this.props.index}
                    //isDragDisabled={true} Desabilita todo el drag
                    //     isDragDisabled={this.props.task.id === 'task-1'} // Ese id queda desabilitado. Aun puede moverse si mueves los otrsos sobre el 
                    isDragDisabled={isDragDisabled}
                >
                    {(provided, snapshot) => (            //proveded necesario. snapshot-> efectos //dragableSnapshot: isDraggin: true, dragginOver: 'Column-#' 
                        <Container
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            /* Si se quiere dar un objeto para mover cambiar esta linea handle a ese objeto*/
                            {...provided.dragHandleProps}
                            //Snapshoot
                            isDragging={snapshot.isDragging} //Le da a la variable isDraggin el valor del snapshot
                            //efecto disable
                            isDragDisabled={isDragDisabled}
                        >

                            {/*                   <Handle //UN CUADRADO PARA MOVER DESDE ALLI EL OBJETO Y NO DE TODO LADO
                                {...provided.dragHandleProps} // SE DEBE QUITAR DEL Container  Y COLOCAR EN EL ELEMENTO QUE SE USARA PARA MOVER
                            /> {/*ELEMENTO PARA MOVER DESDE AQUI. PUEDE SER CUALQUIER COSA. */}


                            {this.props.task.content}
                        </Container>
                    )}

                </Draggable>
            </div>
        )
    }
}
