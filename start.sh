#!/usr/bin/bash
cd backend;
npm install package.json;
cd ../frontend;
yarn;
node ../backend/index.js &
nodemon start -y;