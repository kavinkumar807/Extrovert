import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:5000/server/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleRegisterClick = ()=>{
    history.push("/login");
  }


    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Extrovert</h3>
                    <span className="registerDesc">Speak Out with your friends around You on Extrovert</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <h2 className="registerName">Register</h2>
                        <input placeholder="Username" required ref={ username } className="registerInput"/>
                        <input placeholder="Email" required ref={ email } className="registerInput" type="email"/>
                        <input placeholder="Password" required ref={ password } className="registerInput" type="password" minLength="6"/>
                        <input placeholder="Password Again" required ref={ passwordAgain } className="registerInput" type="password" minLength="6"/>
                        <button className="registerButton" type="submit">SignUp</button>
                        <button className="registerRegisterButton" onClick={handleRegisterClick}>Log into Account</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}
