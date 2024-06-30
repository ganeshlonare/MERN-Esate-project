import React, { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useDispatch } from 'react-redux';
import {  signInSuccess } from '../redux/user/userSlice';
import {FaEyeSlash , FaEye} from 'react-icons/fa'


export default function SignUp() {

  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading]=useState(false);
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
    setLoading(true);
    const res=await fetch('/api/auth/signup',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    if(data.success===false){
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    dispatch(signInSuccess(data));
    navigate("/");
  } catch (error) {
    setLoading(false);
    setError(error.message)
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7' >Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='border p-3 rounded-lg' onChange={handleChange}/>
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
        <button disabled={loading} className='bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80'>{loading ? `Loading...` : `sign up`}</button>
        <OAuth />
      </form>
      <div className='flex mt-5 gap-2'>
      <p>Have an account?</p>
      <Link to="/sign-in"> <span className='text-blue-700'>sign in</span></Link>
      </div>
      {error && <p className='text-red-600 mt-5' >{error}</p> }
    </div>
  )
}
