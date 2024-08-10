import React from 'react'
import { Link } from 'react-router-dom'

function Logo({ width = '70px' }) {
  return (
    <Link to='/' className='group'>
      <img 
        src='https://tse1.mm.bing.net/th?id=OIP.9H_C0IoMP-ccCx76nfULQQAAAA&pid=Api' 
        alt='Logo' 
        style={{ width }} 
        className='transition-transform hover:opacity-110 duration-300 ease-in-out transform group-hover:scale-110 rounded-xl'
      />
    </Link>
  )
}

export default Logo;
