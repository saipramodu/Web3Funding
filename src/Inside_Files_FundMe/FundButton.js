// I have copied the Fundme.json from Harhat artificats to get the abi
// To interact with any contract we need it's abi and the contract address
// In hardhat we didn't have to call the abi and addreess as hardhat automatically takes this

// import detectEthereumProvider from '@metamask/detect-provider';
import { useState } from 'react';
import { ethers } from 'ethers';
import { abi } from './FundMeABI';
import { contractAddress } from './FundMeABI';

export default function FundButton() {
  //We can make funding keep loading till the transaction is made
  const [fundLoad, setfundLoad] = useState('');
  const [ethAmount, setEthAmount] = useState('');

  // I'm importing the abi object from FundMeABI json we copied

  // We can take the amount to fund the contract for now from input
  // const ethAmount = document.getElementById('ethAmount').value;

  // fundClick function
  async function fundClick() {
    //setFundLoad will keep loading till transaction is made
    setfundLoad((data) => 'Funding in progress....');
    console.log('The fund is clicked');

    // We can get the provider - metamask wallet address with this
    // Signer acc. is the wallet address
    // const provider = await detectEthereumProvider();
    // const signerAcc = provider.selectedAddress;

    // using Web3Provider instead of detectEthereumProvider as detectEthereumProvider() didn't work
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signerAcc = provider.getSigner();
    console.log('SignerAcc', signerAcc);
    console.log('windows.ethereum', window.ethereum);

    // Just seeing if abi and contract address call works
    console.log('Provider address', signerAcc);
    console.log('abi', abi, 'Contract Address', contractAddress);

    // we can revert if the metamask is not connected
    //typeof is an operator that returns the type of varaible, ex: tpeof 'sai' returns string

    if (typeof window.ethereum !== 'undefined') {
      // Here we need to call the contract to interact with it
      // We will need the contract abi and contract address to intreact
      // For this we can use ethers contract refer https://docs.ethers.io/v5/api/contract/contract/

      // syntax is new ethers.Contract (contract address, abi, signer address)
      const fundMeContract = new ethers.Contract(
        contractAddress,
        abi,
        signerAcc
      );
      //Now we can interact with the contract - if clicked 50 eth will go to the contract
      try {
        await setEthAmount(() => document.getElementById('ethAmount').value);
        console.log('ethAmount', ethAmount);
        const transactionResponse = await fundMeContract.fund({
          value: ethers.utils.parseEther(ethAmount),
        });
        const contractBalance = await provider.getBalance(
          fundMeContract.address
        );
        console.log('Contract Balance ', contractBalance.toString());
        console.log('transaction response', transactionResponse);
        // In ordre for us to wait for the transactions to happen - we need to use events and listeners
        await listenForTransactionMine(transactionResponse, provider);
        console.log('The transaction done');
        setfundLoad('Funding Passed');
      } catch (error) {
        console.log('Error is', error);
      }
    } else {
      setfundLoad(
        (data) => 'Please connect to metamask first to make the transaction...'
      );
    }
  }

  // Notice that this function is not an async function - this is due to async nature of js
  // the console.log('The transaction done') is done before the provider.once
  // that is why a promise is sent
  function listenForTransactionMine(transactionResponse, provider) {
    //A transaction hash/id is a unique string of characters
    // that is given to every transaction that is verified and added to the blockchain.
    //every transaction response will have a hash
    console.log('Mining', transactionResponse.hash);
    return new Promise((resolve, rej) => {
      provider.once(transactionResponse.hash, (transactionRceipt) => {
        // Provider.once listenes to an event when it occurs
        // ie. it is same as transactionresponse but with block confirmations
        console.log('Transaction receipt', transactionRceipt);
        console.log(
          'Transaction completed with',
          transactionRceipt.confirmations,
          'confirmations'
        );
        // The resolve() is for the provider.once
        resolve();
      });
    });
  }

  return (
    <>
      <label>Enter the ETH amount to fund the contract</label>
      <input id='ethAmount' placeholder='0.1 ETH'></input>
      <button onClick={fundClick}>Fund</button>
      <h4 id='funding'>{fundLoad}</h4>
    </>
  );
}
// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
// 0x70997970c51812dc3a010c7d01b50e0d17dc79c8
//  "contractAddress": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
