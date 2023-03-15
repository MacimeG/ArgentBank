import { useState } from "react";
import { useDispatch } from 'react-redux'
import { login } from "../utils/services";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AUTHENTICATED } from "../store";
import { useNavigate } from "react-router-dom";
import '../style/signIn.css'

export default function SignIn(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRemember]= useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  
  if(token){
    navigate('/Profile')
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setRemember(e.target.checked)

    login(email, password).then(response => response.json()).then(response => {
      dispatch(AUTHENTICATED(rememberMe, response.body.token))
      
      if(rememberMe === true){
        localStorage.setItem("token",response.body.token)
        localStorage.setItem("email",email)
      }
      navigate('/Profile')
    }).catch(error =>{
      alert('veuillez entrer de bonnes infos')
    })

  }

  return(
    <div>
      <Navbar/>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" autoComplete="off" onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" value={rememberMe}  onChange={(e)=> setRemember(e.target.checked)} /><label htmlFor="remember-me"
            >Remember me</label>
            </div>
            <button className="sign-in-button" to="/SignIn">Sign In</button>
          </form>
        </section>
      </main>
          <Footer/>
    </div>

  )
}