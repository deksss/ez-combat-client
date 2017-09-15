#!/bin/bash

npm run build
echo "Client is built"
rm -rf ../combat/client/*
echo "Client forlder on server is cleared"
cp -rp ./build/* ../combat/client
echo "Client build moved to server"
cd ../combat
npm start

