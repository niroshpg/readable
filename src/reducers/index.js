import { combineReducers } from 'redux'

import {
  ADD_POST,
  REMOVE_POST,
  ADD_CATEGORY,
  INC_VOTE,
  DEC_VOTE,
  ADD_COMMENT,
  INC_COMMENT_VOTE,
  DEC_COMMENT_VOTE
} from '../actions'


function posts (state = {}, action) {
  const { id,timestamp,title,body,author,category,voteScore,deleted} = action
  let newVoteScore
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
    case INC_VOTE :
      newVoteScore = state[id].voteScore + 1
      return {
        ...state,
        [id]: {
            ...state[id],
            voteScore: newVoteScore,
        }
      }
    case DEC_VOTE :
      newVoteScore = state[id].voteScore - 1
      return {
        ...state,
        [id]: {
            ...state[id],
            voteScore: newVoteScore,
        }
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

function comments (state = {}, action) {

 const { id,parentid,timestamp,body,author,voteScore,deleted,parentDeleted} = action
 let newVoteScore
  switch (action.type) {
    case ADD_COMMENT :
      return {
        ...state,
        [id]: { id,parentid,timestamp,body,author,voteScore,deleted,parentDeleted}
      }
    case INC_COMMENT_VOTE :
      newVoteScore = state[id].voteScore + 1
      return {
        ...state,
        [id]: {
            ...state[id],
            voteScore: newVoteScore,
        }
      }
    case DEC_COMMENT_VOTE :
      newVoteScore = state[id].voteScore - 1
      return {
        ...state,
        [id]: {
            ...state[id],
            voteScore: newVoteScore,
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  posts,categories,comments
})
