#!/bin/bash

echo "Seeding Data..."
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