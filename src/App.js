import React, { useEffect, useState }  from 'react'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import EmailForgetPassword from './components/ForgetPass/EnterEmail/EnterEmail'
import ForgetPassword from './components/ForgetPass/ForgertPass'
import Validation from './components/Validation/Validation'
import Preloader from './components/Preloader/Preloader'
import Chat from './components/Massenger/Mobile/MobileChat/MobileChat';
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
        <Route path='/' exact component={state ? Preloader :Home} />
        <Route path='/login' component={state ? Preloader :Login} />
        <Route path='/register' component={state ? Preloader :Register} />
        <Route path='/fpassEmail' component={state ? Preloader :EmailForgetPassword} />
        <Route path='/fpass' component={state ? Preloader :ForgetPassword} />
        <Route path='/valid' component={state ? Preloader :Validation} />
        <Route path='/chat' component={state ? Chat :Home} />
      </Switch>
    </Router>
  )
   

}

export default App;
