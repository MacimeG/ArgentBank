// fetch for get token , to authentication user
export async function login(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    
    return await fetch('http://localhost:3001/api/v1/user/login', requestOptions)
 
}
// fetch for get data user with token
export async function userFetchData(token){
    const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    return await fetch("http://localhost:3001/api/v1/user/profile",
    requestOptions)
        
  
}

export async function updateUserData(token, firstName, lastName){
    const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName }),
    };
  
    const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        options
    )
    return response
        
}

