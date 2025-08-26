import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../api/auth.js"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async(data) => {
        setError("")
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className="max-w-md w-full space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <Logo width="60px" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back!
                    </h2>
                    <p className="text-gray-600">
                        Sign in to your BlogSpace account
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(login)} className="space-y-6">
                        {/* Email Field */}
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
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                                    errors.password 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        By signing in, you agree to our{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-500">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-500">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login