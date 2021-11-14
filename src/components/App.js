import React, {Component} from 'react';
import TrelloList from "./TrelloList";
import {connect} from 'react-redux';
import "./App.scss";
import TrelloActionButton from "./TrelloActionButton";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {sort} from "../actions/listsActions";

class App extends Component {
  onDragEnd = (result) => {
    const {destination, source, draggableId, type} = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
    ));
  };

  render() {
    const {lists} = this.props;
    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="App">
            <h1>Trello-like board</h1>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className='lists_container'>
                    {lists.map((list, index) =>
                        <TrelloList listID={list.id}
                                    key={list.id}
                                    title={list.title}
                                    cards={list.cards}
                                    index={index}/>)}
                    {provided.placeholder}
                    <TrelloActionButton list/>
                  </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
