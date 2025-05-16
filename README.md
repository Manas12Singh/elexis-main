<h1 align="center">ELEXIS - A Blockchain Voting App</h1>

This is Elexis, a decentralized voting system built on the Volta testnet. This secure and transparent solution guarantees tamper-proof voting records, enabling users to cast their votes remotely while prioritizing anonymity and fraud prevention. Dive into this project for a dependable and decentralized approach to voting processes.

## Features

• Simple and elegant UI for a seamless voting experience.

• Leverages blockchain for fraudless and transparent voting.

• Prioritizes user anonymity.

## Requirements
• <b>HardHat</b> for creating and managing our smart contracts.

• <b>MetaMask</b> browser extension for performing transactions.

• <b>Live Server</b> extension for running our web-app locally.

## Installation
1. Open terminal.

2. Clone the repository by using the command:
   ```cmd
   git clone https://github.com/darkn3to/elexis.git
   ```
   or simply download the zip file from the code dropdown button above.

3. Download and install node.js. Add it to your path.

4. Install hardhat by running the following command in the terminal: 
   ```cmd 
   npx hardhat
   ```
   then
   ```cmd
   npx hardhat init
   ``` 
   and 
   ```cmd
   npx hardhat compile
   ```

5. Create .env file in the root directory as follows :
   ```.env
    API_URL="https://volta-rpc.energyweb.org/"
    PRIVATE_KEY="THE_HIDDEN_KEY_IN_YOUR_METAMASK_ACCOUNT" 
    CONTRACT_ADDRESS="TOKEN_CONTRACT_ADDRESS" 
    ```

## Usage

1. Add MetaMask extension to your browser and create an account if not already created.
 
   • You would also need to add Volta TestNet to your account. Go to [this link](https://thirdweb.com/energy-web-volta-testnet) to get the details required to do so. Then goto [this link](https://voltafaucet.energyweb.org/) to add Volta tokens needed to perform transactions.

2. Open deploy.js and add/remove names as per requirement.

3. Run the command:
    ```cmd
    npx hardhat run --network volta scripts/deploy.js
    ```

4. Deploy the dApp using live server.

## Some Screen Shots

![candidates](https://github.com/darkn3to/elexis/assets/62509177/11af3759-521d-4016-8ae8-796550518bdf)

![winner](https://github.com/darkn3to/elexis/assets/62509177/6398e6b0-5ddc-4e55-ac66-df62ab208c4f)

![voting_page_interface](https://github.com/darkn3to/elexis/assets/62509177/2de08c17-60d5-477e-a24c-36cec9270ff3)

![vote_status](https://github.com/darkn3to/elexis/assets/62509177/a5f16516-8247-4745-b937-c695fa7db018)

![view_candidates](https://github.com/darkn3to/elexis/assets/62509177/944cd372-679d-4556-85c6-11794dcdf86b)

![connect_metamask](https://github.com/darkn3to/elexis/assets/62509177/79dd0dc9-3c1b-4f62-8a2c-400df58c5fb8)

## Live Demo
   [Elexis](https://elexis.netlify.app)
