import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
      <Link to="/">
        <span className='text-xl font-semibold tracking-tight text-white'>
          Cine<span className='text-primary'>House</span>
        </span>
      </Link>
    </div>
  )
}

export default AdminNavbar
