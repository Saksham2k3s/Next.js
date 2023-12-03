import Link from "next/link"

export default function Home() {
  return (
   <div className='flex flex-column items-center justify-center min-h-screen py-2'>
    <h1 className='h1'> 🚀 Assignment Completed By Saksham Shrivastava  🚀 </h1>
    <hr />
    <h1 className="border-red"> Go to /banks to watch the data or click here <Link href={'/banks'} > ➡️ Banks</Link></h1>
   
   </div>
  )
}
