import React, {useState} from 'react'
import authService from '../api/auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }, watch} = useForm()

    const create = async(data) => {
        setError("")
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if(currentUser) dispatch(login(currentUser));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
            console.log("error while creating acc",error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className="max-w-md w-full space-y-8">
                
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <Logo width="60px" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Join BlogSpace
                    </h2>
                    <p className="text-gray-600">
                        Create your account and start sharing your stories
                    </p>
                </div>

                
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                                    errors.name 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters"
                                    }
                                })}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                                    errors.email 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Please enter a valid email address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Create a strong password"
                                className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                                    errors.password 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                            <div className="mt-2">
                                <div className="text-xs text-gray-500">
                                    Password strength requirements:
                                    <ul className="list-disc list-inside mt-1">
                                        <li>At least 6 characters</li>
                                        <li>One uppercase and lowercase letter</li>
                                        <li>One number</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform transition duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        By creating an account, you agree to our{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-500">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-500">
                            Privacy Policy
                        </a>
                    </p>
                </div>

                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                        Why join BlogSpace?
                    </h3>
                    <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Write and publish your stories instantly
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Rich text editor with image support
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Connect with a community of writers
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup