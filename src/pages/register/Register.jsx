import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../redux/features/snackbarSlice';
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [agree, setAgree] = useState("False");
    const [values, setValues] = useState({
        password: '',
        shoWPassword: false,
    })
    const dispatch = useDispatch();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // registerUser({email, name, password, password2: confPassword, tc: agree }).then((res)=>{
        //     console.log(res);
        // }).catch((error)=>{
        //     console.log(error);
        // })
        try {
            const res = await axios.post("http://127.0.0.1:8000/account/register/", {
                email: email,
                name: name,
                password: password,
                password2: confPassword,
                tc: agree,
            })
            if(res.status === 201)
            {
                dispatch(openSnackbar({
                    message: "Registration Successful",
                    severity: "success"
                }))
                localStorage.setItem("socialmediatoken", res.data.token.access);
            }
        } catch (error) {
            dispatch(openSnackbar({
                message: error,
                severity: "error"
            }))
            console.log(error);
        }
    }
    return (
        <div>
            <form>
                <div className='name'>
                    <label for="name">Enter Name: </label>
                    <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='email'>
                    <label for="email">Enter Your Email: </label>
                    <input type="emial" id='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='password'>
                    <div onClick={()=>setValues({...values, shoWPassword: !values.shoWPassword})}>
                        {values.shoWPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </div>
                    <label for="password">Enter Your Password: </label>
                    <input type={values.shoWPassword ? "text" : 'password'} id='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='confPassword'>
                    <label for="confPassword">Confirm Password: </label>
                    <input type="password" id='confPassword' onChange={(e) => setConfPassword(e.target.value)} />
                </div>
                <div className='termsConditions'>
                    <input type="checkbox" name="" id="tandc" onChange={() => {
                        if (agree === 'False') {
                            setAgree('True')
                        } else {
                            setAgree('False')
                        }
                    }} />
                    <label for="tandc">I agree the terms and Conditions </label>
                </div>
                <button type="submit" onClick={handleSubmit}>Register</button>
            </form>
        </div>
    )
}
