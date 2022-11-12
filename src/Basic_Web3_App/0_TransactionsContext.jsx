// In this file we will use context API and create variables needed in one place
// using useContext we can use these variables in any other place

import { ethers } from 'ethers';
import React from 'react';
import { abi } from './Transactions.json';
import { contractAddress } from './Transactions.json';

// To create a context use create context
const AppContext = React.createContext();

function AppProvider({ childern }) {
  // For interacting with the smart contract - we need a account and contract abi to use new ethers.Contracts
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //Signer is the account
  const signer = provider.getSigner();
  //To get the contract we need contract address, abi and signer (cas)
  const TransactionContract = new ethers.Contract(contractAddress, abi, signer);

  //Once we have created the context we can return the context provider with the values we want to pass to the components
  return (
    <AppContext.Provider value={(provider, signer, TransactionContract)}>
      {childern}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };

/*
Use of children: 

in main.jsx -   

  <AppProvider>
    <App />
  </AppProvider>

  If we use function AppProvider({ childern }) - here the children are the ones inside the AppProvider function  ie. <App />
  once we do this, we can use the values from AppContext in any of the children
*/
