/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { updateUserData, userFetchData } from "../utils/services";
import { DATAUSER, UPDATEUSER } from "../store";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";



export default function Profile(){
    const stateToken = useSelector((state) => state.token)
    const token = localStorage.getItem('token')

    const dispatch = useDispatch()
    const [userData, setUserData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [userName, setUserName]= useState('')
    const [userLastName, setUserLast] = useState('')

    function handleEdit(){
      setIsEdit(true)
    }
    function handleCancelEdit(){
      setIsEdit(false)
    }
    function handleUserEdit(e){
      e.preventDefault()
      if(stateToken){
        updateUserData(stateToken, userName, userLastName).then(response => response.json()).then(response => {
          dispatch(UPDATEUSER(response.body.firstName, response.body.lastName))
          dispatch(DATAUSER(response.body))
          setUserData({firstName: response.body.firstName, lastName: response.body.lastName })
        })
      }
      else if(token){
        updateUserData(token, userName, userLastName).then(response => response.json()).then(response => {
          dispatch(UPDATEUSER(response.body.firstName, response.body.lastName))
          dispatch(DATAUSER(response.body))
          setUserData({firstName: response.body.firstName, lastName: response.body.lastName })
        })
      }
      setIsEdit(false)
    }
    useEffect(() =>{
      if(stateToken){
          userFetchData(stateToken).then(response => response.json())
          .then(data => {
              dispatch(DATAUSER(data.body)); 
              setUserData(data.body)
          }).catch(error => {
            console.log(error)
          })
  
      }
      else if(token){
          userFetchData(token).then(response => response.json())
          .then(data => {
              dispatch(DATAUSER(data.body)); 
            setUserData(data.body)
          }).catch(error => {
            console.log(error)
          })
      }
    }, [])

    if(!token || !stateToken){
      return <Navigate to="/SignIn"/>
    }

        return !isEdit ? (
            <div>
            <Navbar/>
            <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userData?.firstName} {userData?.lastName} !</h1>
        <button className="edit-button" onClick={handleEdit}>Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
            <Footer/>
        </div>
    ) : (
      <div>

     <Navbar/>
      <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userData?.firstName} {userData?.lastName} !</h1>
        <form className="formEditUser" >
      <label htmlFor="firstName"></label>
      <input type="text" defaultValue={userData?.firstName} className="edit-input" id="firstName" onChange={(e) => setUserName(e.target.value)} ></input>
      <label htmlFor="lastName"></label>
      <input type="text" defaultValue={userData?.lastName} className="edit-input" id="lastName" onChange={(e) => setUserLast(e.target.value)}></input>
        </form>
        <div className="button-container">
        <button className="edit-button"onClick={handleUserEdit}>Valide</button>
        <button className="edit-button" onClick={handleCancelEdit} >Cancel</button>
        </div>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
        
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      </main>
        <Footer/>
        </div>
    )
}