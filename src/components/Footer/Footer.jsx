import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800">BlogSpace</h3>
            <p className="text-gray-600 text-sm">Share your stories with the world</p>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition duration-300">
              Home
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-600 transition duration-300">
              Login
            </Link>
            <Link to="/signup" className="text-gray-600 hover:text-blue-600 transition duration-300">
              Sign Up
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-600 hover:text-blue-400 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BlogSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
