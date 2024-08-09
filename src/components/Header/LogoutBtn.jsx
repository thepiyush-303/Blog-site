import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'


const LogoutBtn = () => {

    const dispatch = useDispatch()

    const loginhandler = ()=>{
        authService.logout().then((
            dispatch(logout())
        ))
    }
    
  return (
    <button onClick={loginhandler} 
        className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:from-blue-600 hover:to-teal-500 transform hover:scale-105 transition-transform duration-300"
    >
        Logout
    </button>
  )
}

export default LogoutBtn;
