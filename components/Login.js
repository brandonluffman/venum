import { useState, useContext, useEffect } from 'react';
// import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {CiMail} from 'react-icons/ci'
import {IoIosUnlock, IoMdMail} from 'react-icons/io'
import {AiFillEye, AiFillEyeInvisible, AiFillMail} from 'react-icons/ai'
import Link from 'next/link'
// import { UserContext } from '../context/UserContext';
// import { useRouter } from 'next/router';




const Login = () => {
//   const { user, login } = useContext(UserContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
//   const router = useRouter(); // Get the router object
//   useEffect(() => {
//     if (user) {
//       router.push('/');
//     }
//   }, [user, router]);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     const success = await login(email, password);
//     if (success) {
//       router.push('/');
//     }
//   };

  return (
    <>
    <div className='login-container'>
    <div className='login-box'>

        <h1>Login</h1>
        {/* <form onSubmit={handleLogin}> */}
        <form>
        <div className='login-input-div'>
            <IoMdMail  className='login-icon mail-icon'/>
            {/* <input className='login-input login-email-input' placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} ></input> */}
            <input className='login-input login-email-input' placeholder='Email' type='email' ></input>

        </div>
        <div className='login-input-div'>
            <IoIosUnlock className='login-icon lock-icon'/>
            {/* <input className='login-input login-password-input' placeholder='Password' type={visible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}></input> */}
            <input className='login-input login-password-input' placeholder='Password' type={visible ? "text" : "password"}></input>

            <button className='password-vis-button' type='button' onClick={() => setVisible(!visible)}><AiFillEye className='visibility-icon'/></button>  
        </div>
        {/* <Link href='/register'><p className='create-account'>Need to create an account?</p></Link> */}
        <Link href='/forgotpassword'><p className='forgot-password'>Forgot Password?</p></Link>
        <button type='submit' className='login-button'>Login</button>
        {/* <Link href='/register'><button className='login-button'>Create Account</button></Link> */}

        </form>
    </div>
    </div>
    </>
  );
}

export default Login

        {/* <div className='login-avatar-div'>
        <img src='/avatar.png' className='login-avatar-img'></img>
        </div> */}