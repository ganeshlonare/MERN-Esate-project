import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Create Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
        <input type="text" id="name" placeholder='Name' className='p-3 border rounded-lg' maxLength='60' minLength='10' required/>
        <textarea type="text" id="description" className='p-3 border rounded-lg' required placeholder='description'></textarea>
        <input type="text" id="address" placeholder='Address' className='p-3 border rounded-lg' required/>
        <div className="flex gap-6 flex-wrap">
          <div className="flex gap-2">
            <input type="checkbox" id="sale" className='w-5' />
            <span>sale</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="rent" className='w-5' />
            <span>Rent</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="parking" className='w-5' />
            <span>Parking spot</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="furnished" className='w-5' />
            <span>Furnished</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="offer" className='w-5' />
            <span>Offer</span>
          </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input type="number" id="bedrooms" max='10' min='1' required className='p-3 border border-gray-300 rounded-lg' />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="bathrooms" max='10' min='1' required className='p-3 border border-gray-300 rounded-lg' />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="regularPrice" max='1000000' min='1' required className='p-3 border border-gray-300 rounded-lg' />
              <div className="flex flex-col items-center">
              <p>Regular price</p>
              <span className='text-sm'>($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="discountPrice" max='1000000' min='1' required className='p-3 border border-gray-300 rounded-lg' />
              <div className="flex flex-col items-center">
              <p>Discounted price</p>
              <span className='text-sm'>($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images: 
            <span className=' font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='images/*' multiple />
            <button className='text-green-700 p-3 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
        <button className='p-3 border uppercase bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  )
}
