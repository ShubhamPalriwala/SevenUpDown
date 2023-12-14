#!/usr/bin/env bash

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
cargo install --locked --version 20.0.0-rc.4.1 soroban-cli

npm run build
npm run start