import { useState } from "react";


import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function SignIn(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  console.log("email",email)
  console.log("password", password)
  return(
    <div>
      <Navbar/>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
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