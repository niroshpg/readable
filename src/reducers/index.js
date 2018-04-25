import { combineReducers } from 'redux'

import {
  ADD_POST,
  REMOVE_POST,
} from '../actions'

const initialPostsState = {
  1: {
    content: "post1"
  },
  2: {
    content: "post2"
  },

}


function posts (state = {}, action) {
  const { id,title} = action

  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        [id]: { id, title } 
      }
    case REMOVE_POST :
      return {
        ...state,
        [id]: null
      }
    default :
      return state
  }
}

export default combineReducers({
  posts
})
