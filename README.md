# loloton

Simple lottery project in ton ecosystem.

The project consists  of three main parts:
- frontend (as TMA)
- backend
- smart contract to run main logic of lottery


## What is lottery

The main purpose of the project to build and deploy full working telegram mini app to run simple and useful lottery 
project on TON blockchain.

## Storage

Persisting data in state costs gas. The contract must pay rent periodically from its balance. 
State storage is expensive, about 4 TON per MB per year. 

Most addresses take 264-bit to store (8-bit for the workchain id and 256-bit for the account id). 
This means that storing 1000 addresses costs about 0.189 TON per year.

1024 * 1024 * 4 * 8 / 264 = 127100 address per year for 4 TONs