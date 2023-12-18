import {useSelector} from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import {updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'

export default function Profile() {
  const {currentUser ,loading , error} =useSelector((state)=> state.user)
  const fileRef=useRef(null);
  const [file , setFile] = useState(undefined);
  const [fileperc , setFilePerc] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [formData , setFormData] = useState({});
  const dispatch=useDispatch();
  const [updateSuccess,setUpdateSuccess]=useState(false);
  
  useEffect(()=>{
    if(file) {
      handleFileUpload(file);
    }
  },[file])

  const handleFileUpload=(file)=> {
    const storage=getStorage(app);
    const filename=new Date().getTime()+file.name;
    const storageRef=ref(storage,filename);
    const uploadTask=uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress));
    },
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL)=>{
        setFormData({...formData,avatar:downloadURL});
      })  
    })
  };
 
  
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]: e.target.value});
  };


  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser=async ()=>{
    try {
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      });

      const data=await res.json();

      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data)); 

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt="Avatar" />
      <p className='text-sm self-center'>
        {fileUploadError ? <span className='text-red-700'>Error Image Upload(Image must be less than 2mb)</span>:fileperc>0 && fileperc<100 ? ( <span className='text-lime-700'>{`Uploading ${fileperc}%`}</span> ) :fileperc===100 ? ( <span className='text-green-700'>Image successfully uploaded!</span>) : ('')}
      </p>
      <input className='border p-3 rounded-lg' type="text" placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
      <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
      <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password' onChange={handleChange}/>
      <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'loading...' : 'update'}</button>
      </form>
      <div  className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700'>{error? error : " "}</p>
      <p className='text-green-700'>{updateSuccess ? "User is updated successfully": " "}</p>
    </div>
  )
}
