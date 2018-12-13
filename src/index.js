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
        items: [{
            id: 1,
            originalX: 0,
            originalY: 0,

            translateX: 0,
            translateY: 0,

            lastTranslateX: 0,
            lastTranslateY: 0,

            url: "favicon.ico"
        }, {
            id: 2,
            originalX: 0,
            originalY: 0,

            translateX: 0,
            translateY: 0,

            lastTranslateX: 0,
            lastTranslateY: 0,
            url: "favicon.ico"
        }, {
            id: 1,
            originalX: 0,
            originalY: 0,

            translateX: 0,
            translateY: 0,

            lastTranslateX: 0,
            lastTranslateY: 0,

            url: "favicon.ico"
        }, {
            id: 1,
            originalX: 0,
            originalY: 0,

            translateX: 0,
            translateY: 0,

            lastTranslateX: 0,
            lastTranslateY: 0,

            url: "favicon.ico"
        },]
    };

    componentWillUnmount() {
        window.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.removeEventListener('mouseup', (e) => this.handleMouseUp(e));
    }

    handleMouseDown = ({ clientX, clientY }, id) => {
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e, id));
        window.addEventListener('mouseup', (e) => this.handleMouseUp(e, id));

        if (this.props.onDragStart) {
            this.props.onDragStart();
        }

        const items = this.state.items.map(item => {
            if (item.id === id) {
                console.log("starting x: ", this.originalX, "starting y: ", this.state.translateY);
                return { ...item, originalX: clientX, originalY: clientY }
            } else {
                return item;
            }
        })
        this.setState({ items, isDragging: true });
    };

    handleMouseMove = ({ clientX, clientY }, id) => {
        const { isDragging } = this.state;
        const { onDrag } = this.props;

        if (!isDragging) {
            return;
        }
        this.setState(() => {

            const b = this.state.items.find((item) => {
                return item.id === id;
            })
            return {
                items:
                    this.state.items.map(item => {
                        if (item.id === id) {
                            console.log("x:", this.translateX, "y:", this.translateY);
                            return {
                                ...item,
                                translateX: clientX - b.originalX + b.lastTranslateX,
                                translateY: clientY - b.originalY + b.lastTranslateY
                            }
                        } else{
                            return item;
                        } 
                    })
            };

        }, () => {
            if (onDrag) {
                onDrag({
                    translateX: this.translateX,
                    translateY: this.translateY
                });
            }
        }); 
    };

    handleMouseUp = (id) => {
        window.removeEventListener('mousemove', (e) => this.handleMouseMove(e , id));
        window.removeEventListener('mouseup', this.handleMouseUp);


        const items = this.state.items.map(item => {
            if (item.id === id) {
                console.log("end point x: ",  this.state.item.translateX, "end point y: ", this.state.item.translateY);
                return {
                    ...item,
                    lastTranslateX: this.state.item.translateX,
                    lastTranslateY: this.state.item.translateY
                }
            } else {
                return item; 
            }
        })
     
        this.setState(
            ({
                items,
                isDragging: false
            }),
            () => {
                if (this.props.onDragEnd) {
                    this.props.onDragEnd();
                }
            }
        );
        
    };

    render() {
        const { isDragging, id } = this.state;

        return (
            <div>
                <div>
                    {
                        this.state.items.map((item) => (
                            <Container
                                onMouseDown={(e) => this.handleMouseDown(e, id)}
                                x={item.originalX}
                                y={item.originalY}
                                isDragging={isDragging}
                            >
                                <img alt="" src={item.url} />
                            </Container>
                        ))
                    }
                </div>
            </div>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
