import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../api/auth.js'

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const loginhandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    
    return (
        <button 
            onClick={loginhandler} 
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition duration-300 ease-in-out"
        >
            Logout
        </button>
    )
}

export default LogoutBtn;
