#!/bin/bash

SERVER_DIR="server"


cd "$SERVER_DIR" || { echo "Directory $SERVER_DIR not found"; exit 1; }

# Activate virtual environment if necessary
if [ ! -d "venv" ]; then
  echo "Creating virtual environment and installing server dependencies..."
  python3 -m venv venv || { echo "Failed to create virtual environment"; exit 1; }
  source venv/bin/activate || { echo "Failed to activate virtual environment"; exit 1; }
  pip install -r requirements.txt || { echo "Failed to install FastAPI dependencies"; exit 1; }
else
  source venv/bin/activate || { echo "Failed to activate virtual environment"; exit 1; }
fi

# Start the FastAPI server
echo "Starting FastAPI server..."
uvicorn main:app --port 8000 || { echo "FastAPI run failed"; exit 1; }