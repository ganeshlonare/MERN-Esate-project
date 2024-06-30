import notfound from '../../../imgs/notFound.jpg';

export default function NotFound() {
  return (
    <div className='w-screen bg-slate-100 flex justify-center items-center'>
      <img src={notfound} alt="not found" className='h-96 mt-14' />
    </div>
  )
}