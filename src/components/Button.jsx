import React from 'react'

function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    ...props
}) {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
        primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 transform hover:scale-105',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500'
    }
    
    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl'
    }

    return (
        <button 
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            type={type}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            )}
            {children}
        </button>
    )
}

export default Button
