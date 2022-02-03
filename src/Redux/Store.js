import {createStore , combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import allUsersReducer from './AllUsers/Reducer'
import conversationReducer from './Conversation/Reducer'
import modalReducer from './Modal/Reducer'
import socketReducer from './Socket/Reducer'
import userReducer from './User/Reducer'

const rootReducer = combineReducers({
  modalState:modalReducer,
  userState:userReducer,
  allUsersState:allUsersReducer,
  conversationState:conversationReducer,
  socketState : socketReducer
})

const Store = createStore(rootReducer , applyMiddleware(thunk))
export default Store