import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom';
import {FaGoogle} from 'react-icons/fa'

export default function OAuth() {
  const dispatch=useDispatch();
  const navigate =useNavigate();
   const handleGoogleClick=async ()=>{
    try {
      const provider=new GoogleAuthProvider()
      const auth=getAuth(app)

      const result=await signInWithPopup(auth,provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message);
      }
      
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log("could not sign in with google", error);
    
      // Handle fetch API errors
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.log('Network error: Failed to fetch data from the server.');
      } else {
        console.log('Error:', error.message);
      }
    }
  }

  return (
      <button onClick={handleGoogleClick} type='button' className='uppercase bg-red-700 p-3 rounded-lg text-white hover:opacity-95 flex items-center justify-center gap-2'>
        <FaGoogle />
      continue with google
    </button>
  )
}
