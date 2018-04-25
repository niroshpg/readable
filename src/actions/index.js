export const ADD_POST= 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

export function addPost ({ id, title}) {
  return {
    type: ADD_POST,
    id,
    title
  }
}

export function removePost ({ id }) {
  return {
    type: REMOVE_POST,
    id
  }
}
