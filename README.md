# loloton

> You can visit production version for dorahacks hackathon in test environment (in bot you can find working TMA + wallet integration + smart contract communication): 
> [https://t.me/lolotonTestBot](https://t.me/lolotonTestBot)

Simple lottery project in ton ecosystem.

The project consists  of three main parts:
- frontend, TMA (react)
- backend
- smart contract to run main logic of lottery (tact + blueprint env.)


## What is lottery

The main purpose of the project to build and deploy full working telegram mini app to run simple and useful lottery 
project on TON blockchain.

The lottery algorithm is very simple and will be and will be clear to all players. 

Lottery consist of three main directions, any user can play in lottery with:
- 1 ton
- 10 tons
- 100 tons
depending on his passion and budget. 

Each lottery round lasts 10 minutes (can be changed in the original contract - [loloton.tact](./chainend/contracts/loloton.tact)).

In each round (10 minutes) contract for specified amount (1 / 10 / 100 tons) collect all users transactions for specified amount.

Then randomly from all users in each amount contract choose the winner and 80% of all collected amount will transfer to his/her wallet. 
Other amount of money - 20% - is project profit.

If only one user takes part in lottery round - all money returned back to his wallet address.

Very simple - very attractive %)


## Example

Let's look at an example with amount of 10 tons.

| Time     | Action                                                                                                                    | Lottery Balance |
|----------|---------------------------------------------------------------------------------------------------------------------------|-----------------|
| 13:10:00 | new round started                                                                                                         | 0 tons          |
| 13:10:04 | user_1 open TMA and make a lottery bet (10 tons) from his address                                                         | 10 tons         |
| 13:10:30 | user_2 open TMA and make a lottery bet (10 tons) from his address                                                         | 20 tons         |
| 13:12:43 | user_3 open TMA and make a lottery bet (10 tons) from his address                                                         | 30 tons         |
| ...      | 100 users make a lottery bet (10 tons) from their addresses                                                               | 1030 tons       |
| 13:20:00 | finish current round - smart contract randomly choose winner from 103 addresses and send 824 tons (80% of 1030) to winner |                 |
| 13:20:01 | new round started        | 0 tons          |


## Storage

As advised, we do not need to use hash-map to store user's address who takes part in lottery. 

But in our case this is acceptable - we accumulate addresses for 10 minutes - then the entire volume is cleared.

Let's take in consideration the following facts about contract storage in ton.

Persisting data in state costs gas. The contract must pay rent periodically from its balance. 
State storage is expensive, about 4 TON per MB per year. 

Most addresses take 264-bit to store (8-bit for the workchain id and 256-bit for the account id). 
This means that storing 1000 addresses costs about 0.189 TON per year.

Thus, we can calculate the cost of storing an approximate number of addresses per year:
1024 * 1024 * 4 * 8 / 264 = 127100 address per year for 4 TONs

Not so big.
