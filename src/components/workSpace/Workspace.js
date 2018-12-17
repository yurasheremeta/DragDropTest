import React from 'react';
import styled from 'styled-components';

const Container = styled.img`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 500px;
    width: 500px;
`;

export class WorkSpace extends React.Component {

    render() {
                return (
           
                <div>
                    <Container id="a" alt='' src="starlight.jpg" />
                </div>
          

        )
    }
}