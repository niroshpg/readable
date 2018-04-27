import { combineReducers } from 'redux'

import {
  ADD_POST,
  REMOVE_POST,
  ADD_CATEGORY,
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
  const { id,timestamp,title,body,author,category,voteScore,deleted} = action

  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        [id]: { id,timestamp,title,body,author,category,voteScore,deleted }
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

function categories (state = {}, action) {
  const { name,path } = action

  switch (action.type) {
    case ADD_CATEGORY :
      return {
        ...state,
        [name]: {name,path}
      }
    default :
      return state
  }
}

export default combineReducers({
  posts,categories
})
