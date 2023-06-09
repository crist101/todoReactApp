import logo from './logo.svg';
import './App.css';
import "animate.css";
import "semantic-ui-css/semantic.min.css"
import Todo from './todoComponents/read';
import LogIn from './loginComponents/login';
import checkCookie from './cookies/checkCookie';
import { useNavigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
function App() {
  const navigate = useNavigate();

  if(checkCookie()){
    return (
        <Todo />
    );
  }
  else
    return(
      <LogIn />
    )
}


export default App;
