#!/usr/bin/env bash

# Generates the bindings for the seven-up-seven-down contract in the form of an npm package that can be imported by React
soroban contract bindings typescript \
    --network futurenet \
    --contract-id $(cat contract-src/.soroban/seven-up-seven-down) \
    --output-dir node_modules/seven-up-seven-down
cd node_modules/seven-up-seven-down

# The bindings use stellar-sdk v11.0.0-beta.6, which is not compatible with soroban-rpc v20.0.1
sed -i'' -e 's/"stellar-sdk": "11.0.1"/"stellar-sdk": "11.1.0"/g' ./package.json
npm install
