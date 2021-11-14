import React from 'react';
import TrelloCard from "./TrelloCard";
import "./TrelloList.scss";
import TrelloActionButton from "./TrelloActionButton";
import {Droppable, Draggable} from "react-beautiful-dnd";

const TrelloList = ({title, cards, listID, index}) => {
    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <div {...provided.draggableProps}
                     ref={provided.innerRef}
                     className="list_container"
                     {...provided.dragHandleProps}
                >
                    <Droppable droppableId={String(listID)} type="card">
                        {provided => (
                            <div {...provided.droppableProps}
                                 ref={provided.innerRef}
                            >
                                <h3>{title}</h3>
                                {cards.map((card, index) =>
                                    <TrelloCard key={card.id}
                                                index={index}
                                                text={card.text}
                                                id={card.id}/>)}
                                <TrelloActionButton listID={listID}/>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

export default TrelloList;