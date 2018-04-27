export const ADD_POST= 'ADD_POST'
export const ADD_CATEGORY= 'ADD_CATEGORY'
export const REMOVE_POST = 'REMOVE_POST'

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

export function removePost ({ id }) {
  return {
    type: REMOVE_POST,
    id
  }
}
