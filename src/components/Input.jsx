import React, { useId } from 'react'
import { forwardRef } from 'react'

const Input = forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        error = false,
        helperText = "",
        ...props
    }, ref) {
        const id = useId()
        
        const inputClasses = `w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        } ${className}`

        return (
            <div className='w-full'>
                {label && (
                    <label 
                        className='block text-sm font-medium text-gray-700 mb-2' 
                        htmlFor={id}
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={inputClasses}
                    ref={ref}
                    {...props}
                    id={id}
                />
                {helperText && (
                    <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
                        {helperText}
                    </p>
                )}
            </div>
        )
})

export default Input
