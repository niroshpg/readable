import * as ReadableAPI from '../utils/ReadableAPI';

export const ADD_CATEGORY= 'ADD_CATEGORY'

export const ADD_POST= 'ADD_POST'
export const EDIT_POST= 'EDIT_POST'
export const CREATE_POST= 'CREATE_POST'
export const REMOVE_POST = 'REMOVE_POST'

export const ADD_COMMENT = 'ADD_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export const INC_VOTE = 'INC_VOTE'
export const DEC_VOTE = 'DEC_VOTE'
export const INC_COMMENT_VOTE = 'INC_COMMENT_VOTE'
export const DEC_COMMENT_VOTE = 'DEC_COMMENT_VOTE'

export function addPost ({ id, timestamp,title,body,author,category,voteScore,deleted}) {
  return {
    type: ADD_POST,
    id,timestamp,title,body,author,category,voteScore,deleted
  }
}

export function editPost ({ id, timestamp,title,body,author,category,voteScore,deleted}) {
  return {
    type: EDIT_POST,
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

export function removeComment ({ id }) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export function editComment ({ id,parentid,timestamp,body,author,voteScore,deleted,parentDeleted}) {
  return {
    type: EDIT_COMMENT,
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


export function createPost ({ id, timestamp,title,body,author,category,voteScore,deleted}) {
  return {
    type: CREATE_POST,
    id,timestamp,title,body,author,category,voteScore,deleted
  }
}

export function createComment ({ id,parentid,timestamp,body,author,voteScore,deleted,parentDeleted}) {
  return {
    type: CREATE_COMMENT,
    id,parentid,timestamp,body,author,voteScore,deleted,parentDeleted
  }
}

export function incrementVoteAndUpdate(post){
  return (dispatch) => {
    dispatch(incrementVote(post));

    return  ReadableAPI.incrementPostVote(post)
      .then(response => {console.log('Success:', response)})
      .catch(
          (error) => {
            console.error("ERROR: failed to increment post - " + error)
          }
    );
  }
}

export function deccrementVoteAndUpdate(post){
  return (dispatch) => {
  dispatch(decrementVote(post));

  return  ReadableAPI.decrementPostVote(post)
    .then(response => {console.log('Success:', response)})
    .catch(
        (error) => {
          console.error("ERROR: failed to decrement post - " + error)
        }
  );
 }
}

export function incrementCommentVoteAndUpdate(comment){
  return (dispatch) => {
    dispatch(incrementCommentVote(comment));

    return  ReadableAPI.incrementCommentVote(comment)
      .then(response => {console.log('Success:', response)})
      .catch(
          (error) => {
            console.error("ERROR: failed to increment comment - " + error)
          }
    );
  }
}

export function deccrementCommentVoteAndUpdate(comment){
  return (dispatch) => {
    dispatch(decrementCommentVote(comment));

    return  ReadableAPI.decrementCommentVote(comment)
      .then(response => {console.log('Success:', response)})
      .catch(
          (error) => {
            console.error("ERROR: failed to decrement comment - " + error)
          }
    );
  }
}

export function createPostAndUpdate(post){
  return (dispatch) => {
    console.log('createPostAndUpdate');
    ReadableAPI.addPost(post)
    .then(response => {console.log('Success:', response)});
    return dispatch(addPost(post));
  }
}

export function editPostAndUpdate(post){
 return (dispatch) => {
   console.log('editPostAndUpdate');
   ReadableAPI.editPost(post)
   .then(response => {console.log('Success:', response)});
   return dispatch(editPost(post));
 }
}

export function removeCommentAndUpdate(comment){
 return (dispatch) => {
   console.log('removeCommentAndUpdate');
   ReadableAPI.removeComment(comment)
   .then(response => {console.log('Success:', response)});
   return dispatch(removeComment(comment));
 }
}

export function editCommentAndUpdate(comment){
 return (dispatch) => {
   console.log('editCommentAndUpdate');
   ReadableAPI.updateComment(comment)
   .then(response => {console.log('Success:', response)});
   return dispatch(editComment(comment));
 }
}

export function createCommentAndUpdate(comment){
  return (dispatch) => {
    console.log('createCommentAndUpdate');
    ReadableAPI.addCommnent(comment)
    .then(response => {console.log('Success:', response)});
    return dispatch(addCommnent(comment));
  }
}
