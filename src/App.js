import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ForgetPassword from './components/ForgetPass'
import Validation from './components/Validation'
import Massanger from './components/Massenger'
import Chat from './components/Massenger/Mobile/MobileChat'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/fpass" exact component={ForgetPassword} />
          <Route path="/valid" exact component={Validation} />
          <Route path="/massenger" exact component={Massanger} />
          <Route path="/chat"   component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
