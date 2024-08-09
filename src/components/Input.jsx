import React, { useId } from 'react'
import { forwardRef } from 'react'
const Input = forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props       // or kuch dena ho to ...props ka use kro inke label type ke alawa or kuch bhi de to save hojaye or apply hojaye

    }, ref) {               // ref se he to reference de skte ho
        const id = useId()
    return (
        <div className='w-full'>
            {label && <label          // label ke use se easy access hojayega field ka,
            className='inline-block mb-1 pl-1' 
            htmlFor={id}                    // ye bhi for ke tarah ha bss js ma for ko use nhi krte iseliye htmlfor

            >
                {label}
                </label>
                }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id = {id}
            />
        </div>
    )
})
export default Input
