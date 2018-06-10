import {
  ADD_COMMENT,
  INC_COMMENT_VOTE,
  DEC_COMMENT_VOTE
} from '../actions'

const commentReducer = (state = 0, action) => {
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

export default commentReducer
