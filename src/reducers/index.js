import { combineReducers } from 'redux'
import postReducer from './post'
import commentReducer from './comment'
import categoryReducer from './category'

const rootReducer = combineReducers({
  categories: categoryReducer,
  posts: postReducer,
  comments: commentReducer
})

export default rootReducer
