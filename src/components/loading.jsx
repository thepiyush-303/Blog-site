import React from 'react';

const Loading = () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
                <div className="w-12 h-12 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 absolute top-2 left-2 animate-pulse"></div>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-700">Loading BlogSpace...</h2>
            <p className="mt-2 text-gray-500">Please wait while we prepare your experience</p>
        </div>
    </div>
);

export default Loading;