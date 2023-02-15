import {createSlice} from '@reduxjs/toolkit'
// import {useDispatch} from 'react-redux'
// import { combineReducers, configureStore } from '@reduxjs/toolkit'
import produce from "immer"


const initialState = {
    status: null,
    data: null, 
    error: null, 
    token: null
}

const LOGGEDIN = "LOGGEDIN"
const RESOLVED = "RESOLVED"
const REJECTED = "REJECTED"

// const fetching = ()=> ({type: LOGGEDIN})
// const fetchingResolved = (token)=>({type: RESOLVED, payload: token})
// const fetchingRejected = (error)=> ({type:REJECTED, payload: error})



export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export async function login(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };


    // changer par la requette correspondante.
    try{
        const response = await fetch('localhost:3001/api/v1/user/login', requestOptions)
        const data = await response.json()
     
        console.log(data);

    } catch(error){

        console.log("error");
    }
 
}


 function reducer(state = initialState, action){
    return produce(state, draft =>{
        switch(action.type){
            case LOGGEDIN:{
                if(draft.status === "void"){
                    draft.status = 'pending'
                    return
                }
                if(draft.status === 'rejected'){
                    draft.error = null
                    draft.status = 'pending'
                    return
                }
                if(draft.status === 'resolved'){
                    draft.status = 'updating'
                    return
                }
                return
            }
            case RESOLVED:{
                if(draft.status === 'pending' || draft.status === 'updating'){
                    draft.data = action.payload
                    draft.status = 'resolved'
                    return
                }
                return
            }
            case REJECTED: {
                if(draft.status === 'pending' || draft.status === 'updating'){
                    draft.error = action.payload
                    draft.data = null
                    draft.status = 'rejected'
                    return
                }
                return
            }
            default:
                return;
        }

    })
}


export const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers :{
        reduc: reducer
    }
})


