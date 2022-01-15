import {createStore , combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import conversationReducer from './Conversation/Reducer'
import messagesReducer from './Messages/Reducer'
import modalReducer from './Modal/Reducer'
import onlineReducer from './OnlineUsers/Reducer'
import userReducer from './User/Reducer'

const rootReducer = combineReducers({
  modalState:modalReducer,
  userState:userReducer,
  conversationState:conversationReducer,
  messagesState:messagesReducer,
  onlineUserState : onlineReducer
})

const Store = createStore(rootReducer , applyMiddleware(thunk))
export default Store