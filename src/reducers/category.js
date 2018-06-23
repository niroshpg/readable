import {
  ADD_CATEGORY
} from '../actions'

const categoryReducer = (state = 0, action) => {
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

export default categoryReducer
