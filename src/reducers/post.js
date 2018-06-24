import {
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  INC_VOTE,
  DEC_VOTE,
} from '../actions'

const postReducer = (state = 0, action) => {
  const { id,timestamp,title,body,author,category,voteScore,deleted} = action

  let newVoteScore
  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        [id]: { id,timestamp,title,body,author,category,voteScore,deleted }
      }
    case EDIT_POST:
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

export default postReducer
