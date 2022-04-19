import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'
// import { loadUser, loguser } from '../../action/user'
import { NavLink, useHistory } from 'react-router-dom'
import img1 from './../../images/photo28.svg'
import { Nloguser } from '../../../action/user'
import { app } from '../../../firebase'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword ,sendPasswordResetEmail} from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const dispatch = useDispatch()
    const [data, setdata] = useState({
        email: "", password: ""
    })
    const [reset, setreset] = useState(false)
    const auth = getAuth(app)
    const submit = () => {
        if (data?.email && data?.password) {
            // setloading(true)
            // console.log(loading)
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // sendEmailVerification(user)
                    // ...
                    console.log(userCredential.user?.emailVerified)
                    if (userCredential?.user?.emailVerified) {
                        // toast.success('Login sucessful')
                        // window.location.reload()
                        // alert('ehlloo')
                        dispatch(Nloguser({ email: userCredential.user.email }))
                        // dispatch(loadUser())
                        // setloading(false)


                    } else {
                        toast.error("Email is not verified")
                        // alert(error?.message)
                        // setloading(false)
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // setloading(false)
                    // ..
                    // alert(error?.message)
                    toast.error(error?.message)
                    // console.log
                });

        } else {
            toast.error('Enter all the field')
        }
        // dispatch(Nloguser(data))
    }
    const forget = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, data.email)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
                console.log(userCredential)
                toast.success('Reset password link has been send to email')
                setreset(false)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error('email is not register')
                // ..
                console.log(error)
            });
    }

    const token = useSelector((state) => state.normal.token)
    const history = useHistory()
    useEffect(() => {
        if (token) {
            history.push('/')

        }


    }, [history, token])
    return (
        <div className="signup">
            <div className="container">
                <div className="row signupmain shadow-lg">
                    <div className="col-md-6 col-12 signleft">
                        <img src={img1} className="img-fluid" />

                    </div>
                    <div className="col-md-6 col-12 signright">
                        <input type="email" placeholder="Email" name="email" onChange={(e) => setdata({ ...data, email: e.target.value })} required />
                        {
                            reset ? null :

                                <input type="password" placeholder="Password" name="password" onChange={(e) => setdata({ ...data, password: e.target.value })} required />

                        }
                        {
                            reset ? <p>Back to login page <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => setreset(false)}>Click</span></p> : <p>Forgot Password ? <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => setreset(true)}>Reset</span></p>
                        }

                        {
                            reset ? <button className="shadow" onClick={forget}>Reset</button> : <button className="shadow" onClick={submit}>Login</button>
                        }

                        {
                            reset ? null :

                                <NavLink to="/signup" className="nlink">
                                    <h1>Don't have a account?</h1>
                                </NavLink>
                        }
                    </div>
                </div>
                <ToastContainer />
            </div>

        </div>
    )
}

export default Login
