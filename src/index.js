import React from 'react';
import ReactDOM from 'react-dom';
import { Toolbar } from './components/toollbar/Toolbar';
import { WorkSpace } from './components/workSpace/Workspace';
import styled from 'styled-components';
import { DargDropContext } from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';

const Container = styled.div`
    display: flex;
`
 export class App extends React.Component {
    render() {
        return (
            <Container>
                <div>
                    <Toolbar />
                </div>
                <div>
                    <WorkSpace />
                </div>
            </Container>
        );
    }
}


export default DargDropContext(Html5Backend)(App);

ReactDOM.render(<App />, document.getElementById('root'));
