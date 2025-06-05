import React, { useState } from 'react';
import '../CSS/login.css'; // Make sure to create this CSS file or update the path
import { useNavigate } from 'react-router-dom';


function Login() {

  const navigate = useNavigate();
  

  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')

  const handlelogin =(e) =>{
e.preventDefault();  // ✅ correct spelling

    if(username==='adiforpro@gmail.com' && password === 'IAMADI1411'){
      navigate('/AdminDashBoard')
    }
    else{
      alert('Invalid user or password')
    }
  }

  return (

    <div className="main">

    <div className="wrapper">
      <div className="form-box">
        <h2>Login</h2>
        <form  onSubmit={handlelogin}>
          <div className="input-box name">
            <input type="text" required onChange={(e)=>setUsername(e.target.value)} />
            <label>Username</label>
            <div className="person">
              <ion-icon name="person"></ion-icon>
            </div>
          </div>

          <div className="input-box pa">
            <input type="password" required onChange={(e)=>setPassword(e.target.value)}/>
            <label>Password</label>
            <div className="lock">
              <ion-icon name="lock-closed"></ion-icon>
            </div>
          </div>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="btn" type="submit">LOGIN</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
