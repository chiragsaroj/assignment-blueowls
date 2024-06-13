#!/bin/bash

CLIENT_DIR="client"


cd "$CLIENT_DIR" || { echo "Directory $CLIENT_DIR not found"; exit 1; }
# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  # Install dependencies
  npm install || { echo "npm install failed"; exit 1; }
fi

# Start the Vite server
echo "Building Client App..."
npm run build
echo "Starting Client Server..."
npm run preview