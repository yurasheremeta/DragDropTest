import React from 'react';
import styled, { css } from 'styled-components';
import { items } from '../../mocs';
import Draggable from 'react-draggable';

const Container = styled.div`
    padding: 9px;
    cursor: grab;
    ${({ isDragging }) =>
        isDragging && css`
     
      cursor: grabbing;
    `};
  `;

const Table = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: #e1e8f0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 300px;
  `;
const Title = styled.h2`
    margin: auto;
`;

const Image = styled.img`
    height: 50px;
    width: 50px;
`

export class Toolbar extends React.Component {
    state = {
        isDragging: false,
        items: items,
    };

    componentWillUnmount() {
        window.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.removeEventListener('mouseup', (e) => this.handleMouseUp(e));
    }

    handleMouseDown = ({ clientX, clientY }, id) => {

        this.setState({
            id,
        }, () => {

            window.addEventListener('mousemove', this.handleMouseMove);
            window.addEventListener('mouseup', this.handleMouseUp);

            const items = this.state.items.map(item => {
                console.log("item.id", item.id);

                if (item.id === id) {
                    console.log("starting x: ", item.originalX, "starting y: ", item.translateY);
                    return { ...item, originalX: clientX, originalY: clientY }
                } else {
                    return item;
                }
            })
            this.setState({ items, isDragging: true });

        })
    };

    handleMouseMove = ({ clientX, clientY }) => {

        const id = this.state.id;
        console.log("id", id);

        const { isDragging } = this.state;
        const { onDrag } = this.props;

        if (!isDragging) {
            return;
        }
        this.setState(() => {
            return {
                items:
                    this.state.items.map(item => {
                        if (item.id === id) {
                            console.log("x:", item.translateX, "y:", item.translateY);
                            return {
                                ...item,
                                translateX: clientX - item.originalX + item.lastTranslateX,
                                translateY: clientY - item.originalY + item.lastTranslateY
                            }
                        } else {
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


    handleMouseUp = (e, result) => {
        const id = this.state.id;
        let x = e.target;
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);


        // if (!destination) {
        //     return;
        // }

        // if (
        //     destination.id === source.droppableId &&
        //     destination.index === source.index
        // ) {
        //     return;
        // }

        const items = this.state.items.map(item => {
            if (item.id === id) {
                console.log("end point x: ", item.translateX, "end point y: ", item.translateY);
                console.log("tagName", x.tagName);
                return {
                    ...item,
                    lastTranslateX: item.translateX,
                    lastTranslateY: item.translateY,
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
        const { isDragging, items} = this.state;
        const { result } = this.props;
        return (
            <div>
                <div>

                    <Table>

                        <Title>Items</Title>

                        {
                            items.map((item) => (
                                <Draggable
                                    defaultPosition={{ x: 0, y: 0 }}
                                    onStart={(e) => this.handleMouseDown(e, item.id)}
                                    onDrag={(e) => this.handleMouseMove(e)}
                                    onStop={(e) => this.handleMouseUp(e , result)}
                                >

                                    <Container
                                       isDragging={isDragging}
                                    >
                                        <Image  alt="" src={item.url} />
                                    </Container>
                                </Draggable>
                            ))
                        }

                    </Table>
                </div>
            </div>

        );
    }
}