import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='p-10'>
      <h1 className='text-3xl font-semibold'>Welcome to Patient Appointment System 👋</h1>
      <div className='text-xl mt-2'>By Chirag Saroj ( Full Stack Engineer <b>@Redesyn</b> )</div>
      <ul className='mt-4 grid gap-2'>
        <li className='flex items-center gap-2'><img className='w-10 h-10' src='/github.svg' /> - <Link to="https://github.com/chiragsaroj" className='hover:underline text-blue-500'>https://github.com/chiragsaroj</Link></li>
        <li className='flex items-center gap-2'><img className='w-10 h-10' src='/linkedin.svg' /> - <Link to="https://www.linkedin.com/in/chiragsaroj/j" className='hover:underline text-blue-500'>https://www.linkedin.com/in/chiragsaroj/</Link></li>
      </ul>
    </div>
  )
}

export default Dashboard