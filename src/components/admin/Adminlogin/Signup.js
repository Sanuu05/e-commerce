import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'
// import { loadUser, loguser } from '../../action/user'
import {userNormalSign} from '../../../action/user'
import {NavLink} from 'react-router-dom'
import { app } from '../../../firebase'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'
import img1 from './../../images/photo28.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const[data, setdata] = useState({
        email:"" , password:"" , name:"",cpassword:"", mobile:""
    })
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const submit =()=>{
        if (data?.email && data?.password && data.cpassword && data.mobile && data.name) {
            if (data.password === data.cpassword) {
                createUserWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        sendEmailVerification(user)
                        // dispatch(userNormalSign(userdata))
                        dispatch(userNormalSign({email:data.email.toLowerCase(),name:data.name,mobile:data.mobile}))
                        // ...
                        // console.log(userCredential)
                        toast.success("Account created sucessfully, email verification link send to your email id")
                        // setsignup(false)
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        alert(error?.message)
                        toast.error('Email already in use')
                    });
    
            }
            else{
                toast.error('Enter same password')
            }

        } else {
            toast.error('Enter all the field')
        }
        // dispatch(userNormalSign(data))
    }
    return (
        <div className="signup">
            <div className="container">
                <div className="row signupmain shadow-lg">
                    <div className="col-md-6 col-12 signleft">
                        <img src={img1} className="img-fluid" />

                    </div>
                    <div className="col-md-6 col-12 signright">
                    <input type="name" placeholder="Name" name="name" onChange={(e)=>setdata({...data,name:e.target.value})} required/>
                    <input type="email" placeholder="Email" name="email" onChange={(e)=>setdata({...data,email:e.target.value})} required/>
                    <input type="number" placeholder="Mobile Number" name="mobile" onChange={(e)=>setdata({...data,mobile:e.target.value})} required/>
                    <input type="password" placeholder="Password" name="password" onChange={(e)=>setdata({...data,password:e.target.value})} required/>
                    <input type="password" placeholder="ConfirmPassword" name="cpassword" onChange={(e)=>setdata({...data,cpassword:e.target.value})} required/>
                    <button className="shadow" onClick={submit}>SignUp</button>
                    <NavLink to="/login" className="nlink">
                        <h1>Have a account?</h1>
                    </NavLink>
                    </div>
                </div>
                <ToastContainer/>
            </div>

        </div>
    )
}

export default Signup
