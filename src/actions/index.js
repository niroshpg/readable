import * as ReadableAPI from '../utils/ReadableAPI';

export const ADD_POST= 'ADD_POST'
export const EDIT_POST= 'EDIT_POST'
export const CREATE_POST= 'CREATE_POST'
export const ADD_CATEGORY= 'ADD_CATEGORY'
export const REMOVE_POST = 'REMOVE_POST'
export const INC_VOTE = 'INC_VOTE'
export const DEC_VOTE = 'DEC_VOTE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
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
    // ReadableAPI.updateComment(comment)
    //  .then(() => {
    //     dispatch(incrementCommentVote(comment))
    //   })
    //  .catch(
    //     error =>
    //      console.error("ERROR: failed to update comment - " + error)
    //   ).then(response => console.log('Success:', response));

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
  //   ReadableAPI.updateComment(comment)
  //   .then(() => dispatch(decrementCommentVote(comment)))
  //   .catch(
  //      error =>
  //       console.error("ERROR: failed to update comment - " + error)
  //    ).then(response => console.log('Success:', response));
  // }

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
    // .then(() => dispatch(addPost(post)))
    // .then(response => console.log('Success:', response))
    // .catch(
    //    error =>
    //     console.error("ERROR: failed to add post - " + error)
    //  );
  }
 }

 export function editPostAndUpdate(post){
   return (dispatch) => {
     console.log('editPostAndUpdate');
     ReadableAPI.editPost(post)
     .then(response => {console.log('Success:', response)});
     return dispatch(editPost(post));
     // .then(() => dispatch(addPost(post)))
     // .then(response => console.log('Success:', response))
     // .catch(
     //    error =>
     //     console.error("ERROR: failed to add post - " + error)
     //  );
   }
  }
