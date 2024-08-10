import React, { Children } from 'react'

function Button({
    children,
    type = 'button',
    bgcolor = 'bg-blue-700',
    textColor = 'text-white',
    className = '',
    // innerText = 'clickme',
    ...props
}) {

  return (
    <div>
      <button className={`px-4 h-8 w-19 rounded-lg ${bgcolor} ${textColor}${className}`}{...props}>
        {children}
        {/* {innerText} */}
    </button>
    </div>
  )
}

export default Button
