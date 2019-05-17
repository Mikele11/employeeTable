import { FETCH_POST, FETCH_DEPARTS, NEW_DEPARTS, NEW_POST, UPDATE_POST, DELETE_POST, GET_POST } from '../actions/types';

const initialState = {
  departs: [],
  postss: [],
  onepost: [],
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        postss: action.payload
      };
    case GET_POST:
      return {
        ...state,
        onepost: action.payload
      };  
    case FETCH_DEPARTS:
      return {
        ...state,
        departs: action.payload
      }; 
    case NEW_DEPARTS:
      return {
        ...state,
        departs: state.departs.concat(action.payload)
      };
    case NEW_POST:
      return {
        ...state,
        postss: state.postss.concat(action.payload)
      };  
    case UPDATE_POST:
      return {
        ...state,
        postss: state.postss.map( (item, index) => {
          if(index !== action.payload._id) {
            return item;
          }
          return {
            ...item,
            ...action.payload
          }; 
        })
      };
    case DELETE_POST:
      return {
        ...state,
        postss: state.postss.filter(item => item._id !== action.payload._id)
      };
    default:
      return state;
  }
}
