import "./home.css";
import Logo from "../../assets/logo.svg";
import Layout from "../../assets/chat.png";
import {Link} from 'react-router-dom'
import { Button, Slide } from "@mui/material";
function index() {
  return (
    <div className="home">
      <div className="nav">
        <div className="container">
          <div className="nav-brand">
            <a href="/" className="nav-link">
              <img src={Logo} alt="logo" />
              <h2>Twitty</h2>
            </a>
          </div>
          <Button variant="contained" color="secondary">
            Install
          </Button>
        </div>
      </div>

      <div className="main-home">
        <div className="container">
        <Slide direction="right" in={true} mountOnEnter timeout={1000}>
          <div className="main-home-content">
            <h1>Twitty</h1>
            <h2>Simple , Free , Fast</h2>
            <h2>Chat application </h2>
            <p>
              Whit Twitty , You'll get fast , free , secure messaging , avalible
              on phone and desktop <br/>
              all over world. <br/>
              Your message will not be saved anywhere <br/> 
              <code>You can see source code in <a href="/">github</a></code>
            </p>

            <div className="btn-container">
              <Button variant="contained" color="warning" size="large">
                <Link to='/login'> Login </Link>
              </Button>
              <Button variant="outlined" color="warning" size="large">
               <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </Slide>
          <Slide direction="left" in={true}  mountOnEnter timeout={1000} >
    
          <div className="main-home-pic">
            <img src={Layout} alt="chat" loading="lazy" />
          </div>
  </Slide>
        </div>
      </div>
    </div>
  );
}

export default index;
