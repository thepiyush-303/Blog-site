#!/bin/bash

# Blog Application Startup Script

echo "🚀 Starting Blog Application..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   sudo systemctl start mongod"
    echo "   or run: mongod"
    exit 1
fi

# Start backend
echo "📡 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend development server..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "✅ Application started successfully!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped successfully"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Wait for any process to exit
wait
