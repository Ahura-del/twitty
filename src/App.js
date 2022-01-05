import React, { useEffect, useState }  from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import EmailForgetPassword from './components/ForgetPass/EnterEmail'
import ForgetPassword from './components/ForgetPass'
import Validation from './components/Validation'
import Massenger from './components/Massenger'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
function App() {
  const update = useSelector(state => state.modalState.update)
  const [state , setState] = useState(false)
  const stateToken =  localStorage.getItem('token')
  useEffect(()=>{
    stateToken === null ? setState(false) : setState(true)
  },[stateToken , update])
  return(
    <Router>
      <Switch>
        <Route path='/' exact component={state ? Massenger :Home} />
        <Route path='/login' component={state ? Massenger :Login} />
        <Route path='/register' component={state ? Massenger :Register} />
        <Route path='/fpassEmail' component={state ? Massenger :EmailForgetPassword} />
        <Route path='/fpass' component={state ? Massenger :ForgetPassword} />
        <Route path='/valid' component={state ? Massenger :Validation} />
      </Switch>
    </Router>
  )
   

}

export default App;
