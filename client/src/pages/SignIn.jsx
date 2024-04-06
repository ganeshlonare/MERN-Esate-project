import React, { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart , signInFailure , signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth'
import {FaEyeSlash , FaEye} from 'react-icons/fa'
import {Toaster , toast} from 'react-hot-toast'

export default function SignIn() {

  const [formData,setFormData] = useState({});
  const {loading , error} =useSelector((state)=>state.user);
  const [passwordVisiblity , setPasswordVisiblity ] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();

 const handleChange=(e)=> {
  setFormData({
    ...formData,
    [e.target.id]:e.target.value,
  });
 };
   
const handleSubmit=async (e)=> {
  e.preventDefault();
  try {
    dispatch(signInStart());
    const res=await fetch('/api/auth/signin',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    if(data.success===false){
      dispatch(signInFailure(data.message))
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
    toast.success("sign in successfully")
    
  } catch (error) {
    dispatch(signInFailure(error.message))
    toast.error(error.message)
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <Toaster />
      <h1 className='text-center text-3xl font-semibold my-7' >Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' id='email' className='border p-3 rounded-lg ' onChange={handleChange}/>
        
        <div className="">
          {
            passwordVisiblity ? <FaEye onClick={()=>setPasswordVisiblity((curr)=>!curr)} className='absolute md:ml-[460px] mt-4 ml-[450px] text-gray-600 cursor-pointer' /> :
            <FaEyeSlash onClick={()=>setPasswordVisiblity((curr)=>!curr)} className='absolute md:ml-[460px] mt-4 ml-[450px] text-gray-600 cursor-pointer' />
          }
        {
          passwordVisiblity ? <input type="text" placeholder='Password' id='password' className='border p-3 rounded-lg w-full ' onChange={handleChange}/> :
          <input type="password" placeholder='Password' id='password' className='border p-3 rounded-lg w-full ' onChange={handleChange}/>
        }
        </div>
        <button disabled={loading} className='bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80'>{loading ? `Loading...` : `sign in`}</button>
        <OAuth />
      </form>
      <div className='flex mt-5 gap-2'>
      <p>Don't have an account?</p>
      <Link to="/sign-up"> <span className='text-blue-700'>sign up</span></Link>
      </div>
      
    </div>
  )
}
