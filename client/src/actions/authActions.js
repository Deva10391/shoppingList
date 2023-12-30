import axios from 'axios';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';
import { returnErrors } from './errorActions';

const serverAddress = `https://shopping-list-pwnh.onrender.com`;

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios
        .get(`${serverAddress}/api/auth/user`, tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = ({ name, email, password }) => dispatch => {
    const config = {
        headers: {//assenbles the header of request we're sending
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
    axios
        .post(`${serverAddress}/api/users`, body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data//this has the user data AND the token
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL,
            });
        });
}

export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {//assenbles the header of request we're sending
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
    axios
        .post(`${serverAddress}/api/auth`, body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data//this has the user data AND the token
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL,
            });
        });
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const tokenConfig = getState => {
    const token = getState().auth.token;//accesses the token from given function in that file
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}