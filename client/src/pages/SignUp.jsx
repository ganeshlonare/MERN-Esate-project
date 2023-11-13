import React from 'react';
import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7' >Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='border p-3 rounded-lg '/>
        <input type="email" placeholder='Email' id='email' className='border p-3 rounded-lg '/>
        <input type="password" placeholder='Password' id='password' className='border p-3 rounded-lg '/>
        <button className='bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80'>sign up</button>
      </form>
      <div className='flex mt-5 gap-2'>
      <p>Have an account?</p>
      <Link to="/sign-in"> <span className='text-blue-700'>sign in</span></Link>
      </div>
    </div>
  )
}
