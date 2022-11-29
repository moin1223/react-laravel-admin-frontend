import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import  secureLocalStorage  from  "react-secure-storage";

const Login = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({

    email:'',
    password:'',
    error_list: [],

  });

  const handleInput = (e) =>{
    // e.presist();
    setLoginInput({...loginInput, [e.target.name]:e.target.value});
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name:loginInput.name,
      email:loginInput.email,
      password:loginInput.password,
    }
    axios.post(`/api/login`, data)
    .then((res) => {        
        
        const auth = {"roles":[res.data.user.role], "accessToken":res.data.authorisation.token }
        secureLocalStorage.setItem('auth',auth)
        secureLocalStorage.setItem('user',res.data.user)
        secureLocalStorage.setItem('token',res.data.authorisation.token)
        // swal("Success", res.data.message);
        Swal.fire(
          res.data.message,
          'You clicked the button!',
          'success'
        )
        if(res.data.user.role == 2){
          navigate('/user') 
          
        }
      
      else{
        navigate('/admin/dashboard/userlist') 
      }
      

      
    })
    .catch((e)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.response.data.message,

      })
      setLoginInput({...loginInput, error_list:e.response.data.errors})
          
  })

  }

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={registerSubmit}>
          
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input type="email" name='email' onChange={handleInput} value={loginInput.email}  className='form-control'/>
                  <span className='text-danger'>{loginInput.error_list?.email}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input type="password" name='password' onChange={handleInput} value={loginInput.password}  className='form-control' />
                  <span className='text-danger'>{loginInput.error_list?.password}</span>
                </div>
                <div className="form-group mb-3">
                  <button type='submit' className='btn btn-primary'>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Login