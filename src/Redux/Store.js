import {createStore ,  combineReducers} from 'redux'
import ModalReducer from './ModalState/Reducer'

const rootReducer = combineReducers({
    modalState : ModalReducer
})


const Store = createStore(rootReducer)
export default Store