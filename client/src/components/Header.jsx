import { useEffect, useState } from 'react'
// import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

// export default function Header() {
    // const [searchTerm,setSearchTerm]=useState('');
    // const {currentUser}=useSelector(state=> state.user);
    // const navigate=useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const urlParams = new URLSearchParams(window.location.search);
    //     urlParams.set('searchTerm', searchTerm);
    //     const searchQuery = urlParams.toString();
    //     navigate(`/search?${searchQuery}`);
    //   };
    
    //   useEffect(() => {
    //     const urlParams = new URLSearchParams(location.search);
    //     const searchTermFromUrl = urlParams.get('searchTerm');
    //     if (searchTermFromUrl) {
    //       setSearchTerm(searchTermFromUrl);
    //     }
    //   }, [location.search]);
//   return (
//     <header className='bg-slate-600 shadow-md'>
//         <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
//             <Link to="/">
//         <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
//             <span className='text-gray-400 '>Real</span>
//             <span className='text-slate-200 '>Estate</span>
//         </h1>
//         </Link>
//         <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
//             <input type="text" placeholder='search...' className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
//             <button>
//             <FaSearch className='text-slate-600 cursor-pointer'></FaSearch>
//             </button>
//         </form>
//         <ul className='flex gap-4'>
//             <Link to="/"><li className='hidden sm:inline text-slate-200 hover:underline'>Home</li></Link>
//             <Link to="/about"><li className='hidden sm:inline text-slate-200 hover:underline'>About</li></Link>
            // <Link to="/profile">
            // {currentUser?(
            //     <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
            // ):<li className='text-slate-700 hover:underline'>Sign in</li>
            // }
            // </Link>
//         </ul>
//         </div>
        
//     </header>
//   )
// }


import logo from '../../public/search.png'
import {FaSearch} from 'react-icons/fa'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // const {currentUser}=useSelector(state=> state.user);

  const [searchTerm,setSearchTerm]=useState('');
    const {currentUser}=useSelector(state=> state.user);
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };
    
      useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);

  return (
    <nav className="bg-slate-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-8" src={logo} alt="Logo" />
            </Link>
            <div className="hidden md:block ml-6">
              <div className="flex space-x-4">
                <Link to='/' className="text-slate-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/about" className="text-slate-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <Link to="/services" className="text-slate-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                <Link to="/contact" className="text-slate-500 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 flex justify-center lg:justify-end">
            <div className="max-w-xs w-full lg:max-w-md">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className={`relative ${isSearchOpen ? 'ring-2 ring-blue-500' : ''} transition-all duration-300 ease-in-out`}>
                <input 
                  id="search" 
                  type="text" 
                  className={`block w-full border-0 rounded-full py-2 pl-8 pr-4 placeholder-gray-400 text-white focus:outline-none focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isSearchOpen ? 'placeholder-gray-600' : 'placeholder-gray-400'}`} 
                  placeholder="Search..."  
                  value={searchTerm} 
                  onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaSearch className='text-slate-500' />
                </div>
              </div>
            </div>
            
          </form>

          {/* <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-full flex  items-center'>
            <input type="text" placeholder='search...' className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            <button>
            <FaSearch className='text-slate-600 cursor-pointer'></FaSearch>
            </button>
        </form> */}

          <div className="lg:m-10">
          <Link to="/profile">
            {currentUser?(
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
            ):<li className='text-slate-700 hover:underline'>Sign in</li>
            }
            </Link>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="ml-3 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-slate-500 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link to="/about" className="text-slate-500 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">About</Link>
          <Link to="/services" className="text-slate-500 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">Services</Link>
          <Link to="/contact" className="text-slate-500 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
