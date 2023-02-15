import { useState } from "react";
import { useDispatch } from 'react-redux'
import { login } from "../utils/login";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AUTHENTICATED } from "../store";

export default function SignIn(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [rememberMe, setRemember]= useState(false)

  const dispatch = useDispatch()



  console.log("email",email)
  console.log("password", password)

  const handleSubmit = (e)=>{
    e.preventDefault()
    login(email, password).then(response => response.json()).then(response => {
      dispatch(AUTHENTICATED(false, response.body.token))
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
              <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
              >Remember me</label>
            </div>
            {/* <Link className="sign-in-button" to="/SignIn">Sign In</Link> */}
            <button className="sign-in-button" to="/SignIn">Sign In</button>
          </form>
        </section>
      </main>
          <Footer/>
    </div>

  )
}