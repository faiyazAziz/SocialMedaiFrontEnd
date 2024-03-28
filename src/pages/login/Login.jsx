import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './login.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../redux/features/snackbarSlice';
import { loginStart, loginSuccess } from '../../redux/features/userSlice';
import { closeSignin } from '../../redux/features/setSignInSlice';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState("False");
    const [values, setValues] = useState({
        password: '',
        shoWPassword: false,
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("https://social-api-sdvi.onrender.com/account/login/", {
                email: email,
                password: password,
            })
            console.log(res);
            if(res.status === 201)
            {
                dispatch(openSnackbar({
                    message: "Login Successful",
                    severity: "success"
                }))
                dispatch(loginSuccess(res.data));
                dispatch(closeSignin());
                navigate("/");
            }
        } catch (error) {
            dispatch(openSnackbar({
                message: "email or password is not valid",
                severity: "error"
            }))
            console.log(error);
        }
    }
    return (
        <div className='loginPage'>
            <form className='loginForm'>
                <div className="inputItems">
                    <div className='email'>
                        <input placeholder='enter email' type="text" id='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='password'>
                        <input placeholder='enter password' type={values.shoWPassword ? "text" : 'password'} id='password' onChange={(e) => setPassword(e.target.value)} />
                        <div className='showPassword' onClick={() => setValues({ ...values, shoWPassword: !values.shoWPassword })}>
                            {values.shoWPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </div>
                    </div>
                </div>
                <button type='submit' onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Login
