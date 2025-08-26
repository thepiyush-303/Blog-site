import React from 'react'

function Logo({ width = '40px' }) {
  return (
    <div className="flex items-center justify-center" style={{ width, height: width }}>
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl" style={{ width, height: width }}>
        B
      </div>
    </div>
  )
}

export default Logo;
