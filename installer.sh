#!/bin/bash

# Install Rust in non-interactive mode
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Set up the environment variables for Rust (this assumes the default installation path)
source $HOME/.cargo/env

# Add wasm target
rustup target add wasm32-unknown-unknown

# Install Soroban CLI
cargo install --locked --version 20.0.0-rc.4.1 soroban-cli

# Proceed with the normal build process
react-scripts build
