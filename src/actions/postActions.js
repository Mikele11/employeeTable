import { FETCH_POST, FETCH_DEPARTS, NEW_DEPARTS, NEW_POST, UPDATE_POST, DELETE_POST, GET_POST } from '../actions/types'
import axios from 'axios';
import { history } from '../helpers/history';

export const fetchDepart = id => async dispatch => {
  return await axios.get(`/api/post/depart/${id}`)
  .then(res => {
    dispatch({
      type: FETCH_DEPARTS,
      payload: res.data
    })
  })
  .catch((error) => {
    history.push("/");  
    console.log('action err',error)	  
  });
};

export const getEmployee = id => async dispatch => {
  return await axios.get(`/api/post/${id}`)
  .then(res => {
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  })
  .catch((error) => {
    history.push("/");  
    console.log('action err',error)	  
  });
};


export const createDepart = (id, commentData) => async dispatch => {
  return await axios.post(`/api/post/depart/${id}`,commentData)
    .then((res) =>{
      console.log('res.data',res.data)	 
        dispatch({
          type: NEW_DEPARTS,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      history.push("/")
      console.log('action err',err)
  });
};

export const fetchPosts = () => async dispatch => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  return await axios.get(`/api/post`)
    .then((res) =>{
        dispatch({
          type: FETCH_POST,
          payload: res.data
        })
      }
    )
    .catch(error =>{
      console.log('error',error)
  });
};

export const createPost = (postData) => async dispatch => {
  return await axios.post(`/api/post`,postData)
    .then((res) =>{
        dispatch({
          type: NEW_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      history.push("/")
      console.log('action err',err)
  });
};

export const deletePost = (id) => async dispatch => {
  return await axios.delete(`/api/post/${id}`)
    .then((res) =>{
        dispatch({
          type: DELETE_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      history.push("/")
      console.log('action err',err)
  });
};

export const updatePost = (id,postData) => async dispatch => {
  return await axios.put(`/api/post/${id}`,postData)
    .then((res) =>{
        dispatch({
          type: UPDATE_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      console.log('action err',err)
  });
};


