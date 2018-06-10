import * as ReadableAPI from '../utils/ReadableAPI';

export const ADD_POST= 'ADD_POST'
export const ADD_CATEGORY= 'ADD_CATEGORY'
export const REMOVE_POST = 'REMOVE_POST'
export const INC_VOTE = 'INC_VOTE'
export const DEC_VOTE = 'DEC_VOTE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const INC_COMMENT_VOTE = 'INC_COMMENT_VOTE'
export const DEC_COMMENT_VOTE = 'DEC_COMMENT_VOTE'

export function addPost ({ id, timestamp,title,body,author,category,voteScore,deleted}) {
  return {
    type: ADD_POST,
    id,timestamp,title,body,author,category,voteScore,deleted
  }
}
export function addCategory ({name,path}) {
  return {
    type: ADD_CATEGORY,
    name,path
  }
}

export function addCommnent ({id,parentid,timestamp,body,author,voteScore,deleted,parentDeleted}) {
  return {
    type: ADD_COMMENT,
    id,parentid,timestamp,body,author,voteScore,deleted,parentDeleted
  }
}

export function removePost ({ id }) {
  return {
    type: REMOVE_POST,
    id
  }
}

export function incrementVote ({ id }) {
  return {
    type: INC_VOTE,
    id
  }
}

export function decrementVote ({ id }) {
  return {
    type: DEC_VOTE,
    id
  }
}

export function incrementCommentVote ({ id }) {
  return {
    type: INC_COMMENT_VOTE,
    id
  }
}

export function decrementCommentVote ({ id }) {
  return {
    type: DEC_COMMENT_VOTE,
    id
  }
}

export function incrementCommentVoteAndUpdate(comment){
  var inputComment = Object.assign({},comment)
  return (dispatch) => {
    console.log("requesting comment "+JSON.stringify(comment.voteScore)+" update from server ...")
    // start update comment ...

    ReadableAPI.incrementComment(comment)
    // .then((response) => {
    //     if (response.status !== 200) {
    //       console.log("ERROR: " + response.statusText)
    //     }
    //     // update commnet is completed, start processing response ...
    //     return response;
    // })
     .then(() => {
       console.log('comment voteScore: ', comment.voteScore)
        console.log('comment voteScore: ', inputComment.voteScore)
        dispatch(incrementCommentVote(inputComment))
      })
     .catch(
        error =>
         console.error("ERROR: failed to update comment - " + error)
      ).then(response => console.log('Success:', response));

  }
}

export function deccrementCommentVoteAndUpdate(comment){
  return (dispatch) => {
    console.log("requesting comment "+JSON.stringify(comment)+" update from server ...")
    // start update comment ...
    ReadableAPI.decrementComment(comment)
    // .then((response) => {
    //     if (response.status !== 200) {
    //       console.log("ERROR: " + response.statusText)
    //     }
    //     // update commnet is completed, start processing response ...
    //     return response;
    // })
    .then(() => dispatch(decrementCommentVote(comment)))
    .catch(
       error =>
        console.error("ERROR: failed to update comment - " + error)
     ).then(response => console.log('Success:', response));

  }
}
