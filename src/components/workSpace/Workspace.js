import React from 'react';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';

// import HTML5Backend from 'react-dnd-html5-backend'


const Container = styled.img`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 500px;
    width: 500px;
`;
const itemTarget = {
    drop: function(props , monitor){
        // TODO: add handlrMouseUp function 
    }
}

function collect (connect) { 
    return {
        connectDropTarget: connect.dropTarget()
    }
}
export class WorkSpace extends React.Component { 
    render() {
        const {connectDropTarget} = this.props
                return connectDropTarget(
                <div>
                    <Container  alt='' src="starlight.jpg" />
                </div>
        )
    }
}

export default DropTarget('workspace' , itemTarget , collect)(WorkSpace)