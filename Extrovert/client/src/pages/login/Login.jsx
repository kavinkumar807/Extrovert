import { useContext, useRef } from "react"
import {loginCall} from "../../apiCalls"
import "./login.css"
import {AuthContext} from "../../context/AuthContext"
import{CircularProgress} from "@material-ui/core"
import { useHistory } from "react-router";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const {user,isFetching,dispatch} = useContext(AuthContext)
    const history = useHistory();

    const handleClick = (e)=>{
        e.preventDefault()
        loginCall({email:email.current.value,password:password.current.value},dispatch)
    }

    const handleRegisterNewClick = ()=>{
        history.push("/register")
    }

    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Extrovert</h3>
                    <span className="loginDesc">Speak Out with your friends around You on Extrovert</span>
                </div>
                <form  className="loginRight" onSubmit={handleClick}>
                    <div className="loginBox">
                        <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                        <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password}/>
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px"/> : "Login"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={handleRegisterNewClick}>{isFetching ? <CircularProgress color="inherit" size="20px"/> : "Create a New Account"} </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
