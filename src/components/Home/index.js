import "./home.css";
import Logo from "../../assets/logo.svg";
import Layout from "../../assets/chat.png";
import LinkMui from '@mui/material/Link'
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
          <Link to="/massenger">
            install
          </Link>
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
              With Twitty , You'll get fast , free , secure messaging , avalible
              on phone and desktop <br/>
              all over world. <br/>
              Your message will not be saved anywhere <br/> 
              <code>You can see source code in <LinkMui href="https://github.com/Ahura-del/twitty.git" target="_blank" rel="noreferrer" >github</LinkMui></code>
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
