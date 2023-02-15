import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
// import store from './store';
// import { Provider } from 'react-redux';

function App() {
  return (
    // <Provider store= {store}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/SignIn' element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
