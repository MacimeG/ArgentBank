
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { userFetchData } from "../utils/services";
import { DATAUSER } from "../store";
import { useDispatch } from 'react-redux'
import { useState } from "react";
import { store } from "../store";


export default function Profile(){
    const token = localStorage.getItem('token')

    const dispatch = useDispatch()
    const [userData, setUserData] = useState()
    const [isEdit, setIsEdit] = useState(false)

    setIsEdit(false)
    console.log(isEdit)
    const state = store.getState()

    if(state.token){
        userFetchData(state.token).then(response => response.json())
        .then(data => {
            dispatch(DATAUSER(data.body)); 
            setUserData(data.body)
        })

    }
    // else if(token){
    //     userFetchData(token).then(response => response.json())
    //     .then(data => {
    //         dispatch(DATAUSER(data.body)); 
    //         return setUserData(data.body)
    //     })
    // }


    // console.log(userData)

        return(
            <div>
            <Navbar/>
            <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userData?.firstName} {userData?.lastName} !</h1>
        <button className="edit-button">Edit Name</button>
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