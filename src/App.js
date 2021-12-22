import React, { useEffect }  from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import EmailForgetPassword from './components/ForgetPass/EnterEmail'
import ForgetPassword from './components/ForgetPass'
import Validation from './components/Validation'
import Massenger from './components/Massenger'
// import Chat from './components/Massenger/Mobile/MobileChat'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import { useState } from 'react'
function App() {
  const [state , setState] = useState(false)
 useEffect(()=>{
   const userState = ()=>{
     const state =  localStorage.getItem('token')
     if(state === null){
       setState(false)
     }else{
       setState(true)
     }
   }
   userState()
 } , [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={state ? Massenger : Home} />
          <Route path="/login" exact component={state ? Massenger :Login} />
          <Route path="/register" exact component={ state ? Massenger : Register} />
          <Route path="/fpassEmail" exact component={state ? Massenger :  EmailForgetPassword} />
          <Route path="/fpass" exact component={ state ? Massenger : ForgetPassword} />
          <Route path="/valid" exact component={state ? Massenger :  Validation} />
          <Route path="/massenger" exact component={Massenger} />
          {/* <Route path="/chat"   component={Chat} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
