import React from 'react';
import {Icon, Card, Button} from "@material-ui/core";
import "./TrelloActionButton.scss";
import Textarea from "react-textarea-autosize";
import {connect} from "react-redux";
import {addList} from "../actions/listsActions";
import {addCard} from "../actions/cardsActions";

class TrelloActionButton extends React.Component {

    state = {
        formOpen: false
    };

    openForm = () => {
        this.setState({
            formOpen: true
        })
    };

    closeForm = (e) => {
        this.setState({
            formOpen: false
        })
    };

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    handleAddList = () => {
        const {dispatch} = this.props;
        const {text} = this.state;

        if (text) {
            this.setState({
                text: ""
            });
            dispatch(addList(text));

        }
        return;
    };

    handleAddCard = () => {
        const {dispatch, listID} = this.props;
        const {text} = this.state;

        if (text) {
            this.setState({
                text: ""
            });
            dispatch(addCard(listID, text));
        }
        return;
    }

    renderAddButton = () => {
        const {list} = this.props;

        const buttonText = list ? "Add new list" : "Add new card"
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

        return (
            <div className='openForButtonGroup'
                 onClick={this.openForm}
                 style={{
                     opacity: buttonTextOpacity,
                     color: buttonTextColor,
                     backgroundColor: buttonTextBackground
                 }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        )
    }

    renderForm = () => {
        const {list} = this.props;

        const placeholder = list
            ? "Enter list title"
            : "Enter a title for this card";

        const buttonTitle = list ? "Add New List" : "Add New Card";

        return <div>
            <Card className="card_style">
                <Textarea
                    className="textarea_style"
                    placeholder={placeholder}
                    autoFocus
                    onBlur={this.closeForm}
                    value={this.state.text}
                    onChange={this.handleInputChange}
                />
            </Card>
            <div className='formButtonGroup'>

                <Button
                    onMouseDown={list ? this.handleAddList : this.handleAddCard}
                    variant="contained"
                    color='secondary'>
                    {buttonTitle}{' '}
                </Button>
                <Icon className="icon-close" style={{marginLeft: 8, cursor: "pointer"}}>
                    close
                </Icon>
            </div>
        </div>
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

export default connect(addList)(TrelloActionButton);