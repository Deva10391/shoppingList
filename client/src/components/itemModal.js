import React, {Component} from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from "react-redux";
import {addItem} from '../actions/itemActions';
import PropType from 'prop-types';

class ItemModal extends Component{
    state={
        modal: false,
        name: ''
    }
    static propType={
        isAuthenticated: PropType.bool
    }
    toggle=()=>{
        this.setState({
            modal: !this.state.modal
        })
    }
    onChange=(e)=>{
        this.setState({[e.target.name]: e.target.value});//e.target.name accesses the e (event) and saves it as key for object and saves the value (from e.target.value) to that object
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const newItem={
            name: this.state.name
        }
        this.props.addItem(newItem);
        this.toggle();
    }

    render(){
        return(
            <div>{this.props.isAuthenticated ? 
                <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >Add Item</Button> : <h4 className="mb-4 ml-4">Log-in to manage items</h4>}
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To User Item List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Add item"
                                onChange={this.onChange} />
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                                >Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps=state=>({
    item:state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {addItem})(ItemModal);