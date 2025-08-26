import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from "../api/config.js";
import { Container, PostCard } from '../components/index'

function Home() {
    const [posts, setPosts] = useState([])
    const [featuredPosts, setFeaturedPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                // Get first 3 posts as featured
                setFeaturedPosts(posts.documents.slice(0, 3))
            }
        })
    }, [])

    // Always show landing page regardless of authentication status
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <Container>
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                            Share Your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Stories</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            A modern blogging platform where ideas come to life. Write, share, and connect with a community of passionate storytellers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {authStatus ? (
                                // Show different CTAs for logged in users
                                <>
                                    <Link
                                        to="/add-post"
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition duration-300 shadow-lg"
                                    >
                                        Write New Post
                                    </Link>
                                    <Link
                                        to="/all-posts"
                                        className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition duration-300"
                                    >
                                        View All Posts
                                    </Link>
                                </>
                            ) : (
                                // Show sign up/login for non-authenticated users
                                <>
                                    <Link
                                        to="/signup"
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition duration-300 shadow-lg"
                                    >
                                        Start Writing
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition duration-300"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h2>
                        <p className="text-xl text-gray-600">Everything you need to create amazing content</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition duration-300">
                            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Rich Text Editor</h3>
                            <p className="text-gray-600">Create beautiful content with our advanced rich text editor. Format text, add images, and make your stories come alive.</p>
                        </div>
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition duration-300">
                            <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Driven</h3>
                            <p className="text-gray-600">Join a vibrant community of writers and readers. Share your thoughts and discover amazing stories from others.</p>
                        </div>
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition duration-300">
                            <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Fast & Secure</h3>
                            <p className="text-gray-600">Lightning-fast performance with top-notch security. Your content is safe and loads instantly for your readers.</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && (
                <section className="py-20 bg-gray-50">
                    <Container>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Stories</h2>
                            <p className="text-xl text-gray-600">Discover some of our most popular content</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {featuredPosts.map((post) => (
                                <div key={post.$id} className="transform hover:scale-105 transition duration-300">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            {authStatus ? (
                                <Link
                                    to="/all-posts"
                                    className="bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300"
                                >
                                    View All Posts
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-900 transition duration-300"
                                >
                                    Read More Stories
                                </Link>
                            )}
                        </div>
                    </Container>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <Container>
                    <div className="text-center text-white">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Join thousands of writers who are already sharing their stories and building their audience on our platform.
                        </p>
                        <Link
                            to={authStatus ? "/add-post" : "/signup"}
                            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300 shadow-lg"
                        >
                            {authStatus ? "Write a Post" : "Get Started for Free"}
                        </Link>
                    </div>
                </Container>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <Container>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">BlogSpace</h3>
                            <p className="text-gray-400">A modern platform for modern storytellers.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Platform</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/signup" className="hover:text-white transition">Sign Up</Link></li>
                                <li><Link to="/login" className="hover:text-white transition">Sign In</Link></li>
                                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Community</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Writers</a></li>
                                <li><a href="#" className="hover:text-white transition">Readers</a></li>
                                <li><a href="#" className="hover:text-white transition">Guidelines</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 BlogSpace. All rights reserved.</p>
                    </div>
                </Container>
            </footer>
        </div>
    )
}

export default Home