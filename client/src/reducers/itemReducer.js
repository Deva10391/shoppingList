import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from '../actions/types';

const initialState={
    items:[],
    loading: false//data present=NO SIR
}

export default function (state=initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items: action.payload,
                loading: false//dispatch in ../actions/itemsLoading.js set the loading to true by ITEMS_LOADING case here, GET_ITEMS then makes it false
            };
        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter(item=> item._id !==action.payload)//action.payload accesses the payload when DELETE_ITEM is referred
            };
        case ADD_ITEM:
            return{
                ...state,
                items: [action.payload, ...state.items]
            };
        case ITEMS_LOADING:
            return{
                ...state,
                loading: true
            };
        default:
            return state;
    };
};