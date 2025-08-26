import React, {useId} from 'react'
import { forwardRef } from 'react'
function Select({
    options,
    label,
    className,
    error = false,
    helperText = "",
    ...props
}, ref) {
    const id = useId()
    
    const selectClasses = `px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border w-full ${
        error 
            ? 'border-red-300 focus:border-red-500' 
            : 'border-gray-200 focus:border-blue-500'
    } ${className}`
    
  return (
    <div className='w-full'>
        {label && (
            <label 
                htmlFor={id} 
                className='block text-sm font-medium text-gray-700 mb-2'
            >
                {label}
            </label>
        )}
        <select
        {...props}
        id={id}
        ref={ref}
        className={selectClasses}
        >
            {options?.map((option) => (           //check krna jaruri ha kabhi option null to nhi
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {helperText && (
            <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
                {helperText}
            </p>
        )}
    </div>
  )
}

export default React.forwardRef(Select)      // forwardref ka use aise bhi kr skte ho.