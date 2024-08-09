import React from 'react';
import { FaGithub, FaLinkedin, FaHome } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="https://github.com" className="text-white hover:text-gray-400">
            <FaGithub size={30} />
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-gray-400">
            <FaLinkedin size={30} />
          </a>
          <a href="/" className="text-white hover:text-gray-400">
            <FaHome size={30} />
          </a>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold mb-2">Contact Us</h2>
          <p>123 Blog Street</p>
          <p>Blog City, BL 12345</p>
          <p>Email: contact@blogapp.com</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <p>&copy; {new Date().getFullYear()} Blog App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
