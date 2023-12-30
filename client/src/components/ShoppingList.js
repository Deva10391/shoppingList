import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from 'prop-types';

class UserItemList extends Component{
    componentDidMount(){
        this.props.getItems();
    }
    onDeleteClick=(id)=>{
        this.props.deleteItem(id);
    }
    static propTypes={
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    render(){
        const {items}=this.props.item;
        return(
            <Container><ListGroup><TransitionGroup className='UserItem-list'>
                {items.map(({ _id, name}) =>{return(
                    <CSSTransition key={_id} timeout={500} classNames="fade"><ListGroupItem>
                        {this.props.isAuthenticated ? <Button
                        color="danger"
                        className="remove-btn"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                        >&times;</Button> : null}
                        {name}
                    </ListGroupItem></CSSTransition>
                );})}
            </TransitionGroup></ListGroup></Container>
        );
    }
}

const mapStateToProps=(state)=>({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getItems, deleteItem})(UserItemList);
//allows us to include value obtained in getItems into props so that it can be used as this.props.items