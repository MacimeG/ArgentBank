/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { DATAUSER } from "../store";
import argentBankLogo from '../assets/argentBankLogo.png'
import { userFetchData } from "../utils/services";

export default function Navbar(){
  const stateToken = useSelector((state) => state.token)

  const token = localStorage.getItem('token')


  const dispatch = useDispatch()
  const [userData, setUserData] = useState()

  
  function cleanStorage(){
    localStorage.clear()
    sessionStorage.clear()
    window.reload()
  }

  useEffect(() =>{
    if(stateToken){
        userFetchData(stateToken).then(response => response.json())
        .then(data => {
            dispatch(DATAUSER(data.body)); 
            setUserData(data.body)
            console.log(data.body)
        }).catch(error => {
          console.log(error)
        })

    }
    else if(token){
        userFetchData(token).then(response => response.json())
        .then(data => {
            dispatch(DATAUSER(data.body)); 
          setUserData(data.body)
        })
    }
  }, [])
    return (stateToken  && userData) || (token && userData) ?(
        <nav className="main-nav">
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