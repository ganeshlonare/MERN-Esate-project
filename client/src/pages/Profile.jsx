import {useSelector} from 'react-redux'


export default function Profile() {
  const {currentUser} =useSelector((state)=> state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
      <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={currentUser.avatar} alt="not found" />
      <input className='border p-3 rounded-lg' type="text" placeholder='username' id='username'/>
      <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email'/>
      <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password'/>
      <button className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
