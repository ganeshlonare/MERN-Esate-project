import {useSelector} from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import {updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {Toaster , toast} from 'react-hot-toast'

export default function Profile() {
  const {currentUser ,loading , error} =useSelector((state)=> state.user)
  const fileRef=useRef(null);
  const [file , setFile] = useState(undefined);
  const [fileperc , setFilePerc] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [formData , setFormData] = useState({});
  const dispatch=useDispatch();
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  
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
      toast.success("user updated successfully");
      
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
  };

   const handleSignOut=async ()=>{
     try {
      dispatch(signOutUserStart());
      const res=await fetch("/api/auth/signout");
      const data=await res.json();
      if(data.success===false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data))

     } catch (error) {
      dispatch(signOutUserFailure(error.message));
     }
   }

   const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  if(fileperc===100) {
     toast.success("Image uploaded successfully");
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>
        Profile
      </h1>
      <Toaster />
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={formData.avatar || currentUser.avatar} alt="Avatar" />
      <p className='text-sm self-center'>
        {fileUploadError ? <span className='text-red-700'>Error Image Upload(Image must be less than 2mb)</span>:fileperc>0 && fileperc<100 ? ( <span className='text-lime-700'>{`Uploading ${fileperc}%`}</span> ) :""}
      </p>
      <input className='border p-3 rounded-lg' type="text" placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
      <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
      <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password' onChange={handleChange}/>
      <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'loading...' : 'update'}</button>
      <Link to={"/create-listing"} className='bg-green-700 rounded-lg text-white uppercase hover:opacity-95 p-3 text-center'>
      create listing
      </Link>
      </form>
      <div  className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700'>{error? error : " "}</p>
      <p className='text-green-700'>{updateSuccess ? "": " "}</p>
      <button onClick={handleShowListings} className='w-full text-green-700'>Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>
      {userListings &&
        userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => (
            <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain'/>
              </Link>
              <Link className='text-slate-700 font-semibold  hover:underline truncate flex-1' to={`/listing/${listing._id}`} >
                <p>{listing.name}</p>
              </Link>
              <div className='flex flex-col item-center'>
                <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
                <Link to={`/update-listing/${listing._id}`}>
                <button className='text-green-700 uppercase'>Edit</button></Link>
              </div>
            </div>
          ))}
        </div>}
    </div>
  )
}
