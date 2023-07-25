# CryptoBallot

CryptoBallot is the first decentralized application build by me on the top of Ethereum blockchain.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Acknowledgements](#acknowledgements)

## Features

- Create and manage voting events.
- Register as a candidate for an election.
- Cast votes securely and transparently.
- View election results.

## Getting Started

### Prerequisites

- Node.js
- NPM/Yarn
- Ethereum Wallet or MetaMask

### Installation

1. Follow the commands below 😃

```bash
git clone https://github.com/your_username/cryptoballot.git

cd cryptoballot/frontend
```
2. Make changes in .env

- => open the folder in your favorite code editor 
- => Replace the `REACT_APP_CONTRACT_ADDRESS` by your deployed contract's `address`.

3. Start the App.

```bash
npm install

npm start
```


## Architecture

CryptoBallot is built on the Ethereum blockchain using Solidity smart contracts for the backend logic. The frontend is developed using React.js, which interacts with the Ethereum blockchain through Ethers.js to access the smart contracts and display the voting interface to users.

The application follows a decentralized architecture, where the smart contracts are deployed on the Ethereum network, ensuring transparency and immutability of the voting process. Users interact with the application through their MetaMask wallets, which enables them to participate in voting events and cast their votes securely.

## Technologies Used
- Ethereum blockchain
- Solidity for writing smart contracts
- React.js frontend
- Ethers.js for Ethereum interactions
- Sass for styling

## Acknowledgements
I would like to express my gratitude to the following internet tools and docs for their contributions and support in the development of CryptoBallot:

- ChatGPT by OpenAI for providing valuable insights and assistance throughout the project.
- Bard :heart for offering helpful guidance and suggestions during the development process.
- Google for providing useful resources and tools that enriched the project.
- Ethers.js Docs 💯;
  
Their contributions have been instrumental in making CryptoBallot a reality, and I am thankful for their support.