import axios from 'axios';//http client. it sends request for get, post, etc to the defined address
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems=()=>dispatch=>{//dispatch allows use to make a request
    dispatch(setItemsLoading());
    axios
    .get('/api/items')//makes the request to specified path in backend (from routes)
    .then(res=>
        dispatch({
            type: GET_ITEMS,
            payload: res.data//sends back payload to given reducer as data of respond received
        }))
    .catch(err=>dispatch(returnErrors(err.response.data, err.response.status)));
};//sends the GET_ITEMS to ../reducer/itemReducer

export const addItem=(item)=>(dispatch, getState)=>{
    axios
    .post('/api/items', item, tokenConfig(getState))//passes item (obtained from onSubmit from itemModal) to api/items in router
    .then(res=>
        dispatch({
            type: ADD_ITEM,
            payload: res.data//sends (to the reducer) the new item we added 
        }))
    .catch(err=>dispatch(returnErrors(err.response.data, err.response.status)));
};
export const deleteItem=(id)=>(dispatch, getState)=>{
    axios
    .delete(`/api/items/${id}`, tokenConfig(getState))//attaches the token in header
    .then(res=>
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    )
    .catch(err=>dispatch(returnErrors(err.response.data, err.response.status)));
};
export const setItemsLoading=()=>{
    return{
        type: ITEMS_LOADING
    };
};