import { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { DATAUSER } from "../store";
import argentBankLogo from '../assets/argentBankLogo.png'
import { userFetchData } from "../utils/services";
import { store } from "../store";

export default function Navbar(){
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const [userData, setUserData] = useState()
  // const tokenUser = useSelector((state) => state.token)
  // console.log(tokenUser)
  const state = store.getState()
  // console.log(state)
  
  function cleanStorage(){
    localStorage.clear()
    sessionStorage.clear()
  }

  
  if(state.token){
    userFetchData(state.token).then(response => response.json())
    .then(data => {
        dispatch(DATAUSER(data.body)); 
        setUserData(data.body)
    })

  } else if(token){
  userFetchData(token).then(response => response.json())
  .then(data => {
      dispatch(DATAUSER(data.body)); 
      setUserData(data.body)
  })
}
    // console.log(userData)
    return token && userData ?(
        //changé les balise <a> par <link>
        <nav className="main-nav">
            {/* link vers cette meme page */}
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
        <Link to="/profile" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          {userData?.firstName}
        </Link>
        <Link to="/SignIn" onClick={cleanStorage} className="main-nav-item">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </div>
      </nav> 
      ) :(
        <div>
            {/* link vers la page de connexion */}
            <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        </Link>
        <h1 className="sr-only">Argent Bank</h1>
          <Link className="main-nav-item" to="/SignIn">
          <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </nav>
        </div>
      
    )

}