#!/bin/bash

SERVER_DIR="server"


cd "$SERVER_DIR" || { echo "Directory $SERVER_DIR not found"; exit 1; }

# Activate virtual environment if necessary
if [ ! -d "venv" ]; then
  echo "Creating virtual environment and installing Flask dependencies..."
  python3 -m venv venv || { echo "Failed to create virtual environment"; exit 1; }
  source venv/bin/activate || { echo "Failed to activate virtual environment"; exit 1; }
  pip install -r requirements.txt || { echo "Failed to install Flask dependencies"; exit 1; }
else
  source venv/bin/activate || { echo "Failed to activate virtual environment"; exit 1; }
fi

# Start the Flask server
echo "Starting Flask server..."
uvicorn main:app --port 8000 || { echo "FastApi run failed"; exit 1; }


curl -X 'POST' \
  'http://127.0.0.1:8000/register/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@example.com",
  "username": "admin",
  "type": "admin",
  "password": "password"
}'