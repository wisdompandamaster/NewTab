import {createStore} from 'redux'
import reducer from './reducer'

const configureStore = ()=>createStore(reducer)

export default configureStore