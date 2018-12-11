import React from 'react';
import styled, { css } from 'styled-components';
import ReactDOM from 'react-dom';


const Container = styled.div.attrs({
    style: ({ x, y }) => ({
        transform: `translate(${x}px, ${y}px)`
    }),
})`
    cursor: grab;

    ${({ isDragging }) =>
        isDragging && css`
      opacity: 0.8;
      cursor: grabbing;
    `};
  `;



// Array constructor , map 
/// зробити обєкт item в ньому x, y і масив зі стейтами 


export class App extends React.Component {
    state = {
        isDragging: false,

        originalX: 0,
        originalY: 0,

        translateX: 0,
        translateY: 0,

        lastTranslateX: 0,
        lastTranslateY: 0,
        items: this.items,
    };
 

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

        items = [{
            id: 1,
            x: null,
            y: null,
            url: "favicon.ico"
        } ,{
            id: 2,
            x: null,
            y: null,
            url: "favicon.ico"
        }]
    
    handleMouseDown = ({ clientX, clientY }) => {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);

        if (this.props.onDragStart) {
            this.props.onDragStart();
        }
        this.items.map(item => 
            {
                return {
                    ...item,
                     x: this.originalX , 
                     y: this.originalY 
                    }
                })
        this.setState({
            originalX: clientX,
            originalY: clientY,
            isDragging: true
        });
        console.log("starting x: ", this.state.translateX, "starting y: ", this.state.translateY);
    };

    handleMouseMove = ({ clientX, clientY }) => {
        const { isDragging } = this.state;
        const { onDrag } = this.props;

        if (!isDragging) {
            return;
        }

        this.setState(prevState => ({
            translateX: clientX - prevState.originalX + prevState.lastTranslateX,
            translateY: clientY - prevState.originalY + prevState.lastTranslateY
        }), () => {
            if (onDrag) {
                onDrag({
                    translateX: this.state.translateX,
                    translateY: this.state.translateY
                });
            }
        });
        console.log("x:", this.state.translateX, "y:", this.state.translateY);

    };

    handleMouseUp = () => {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        this.setState(
            {
                originalX: 0,
                originalY: 0,
                lastTranslateX: this.state.translateX,
                lastTranslateY: this.state.translateY,

                isDragging: false
            },
            () => {
                if (this.props.onDragEnd) {
                    this.props.onDragEnd();
                }
            }
        );

        // img: {
        //     x,
        //     y,
        //     isDra;
        //     handlehcbc : this.handleMouseDown
        // }
        console.log("end point x: ", this.state.lastTranslateX, "end point y: ", this.state.lastTranslateY);
    };

    render() {
        const { children } = this.props;
        const { translateX, translateY, isDragging } = this.state;

        return (
            <div>
                <img alt="" src="./favicon.ico" onMouseDown={this.handleMouseDown} />

                <div>

                    <Container
                        onMouseDown={this.handleMouseDown}
                        x={translateX}
                        y={translateY}
                        isDragging={isDragging}
                    >
                        <img alt="" src="./favicon.ico" />
                        {children}
                    </Container>

                    <Container
                        onMouseDown={this.handleMouseDown}
                        x={translateX}
                        y={translateY}
                        isDragging={isDragging}
                    >
                        <img alt="" src="./favicon.ico" />
                        {children}
                    </Container>
                </div>
            </div>

        );
    }
}



// // Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById('root'));
