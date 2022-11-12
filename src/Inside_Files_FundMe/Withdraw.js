import { ethers } from 'ethers';
import { abi } from './FundMeABI';
import { contractAddress } from './FundMeABI';

export default function Withdraw() {
  // Getting provider

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signerAcc = provider.getSigner();

  async function withdraw() {
    if (typeof window.ethereum != 'undefined') {
      const fundMeContract = new ethers.Contract(
        contractAddress,
        abi,
        signerAcc
      );
      try {
        console.log('Withdrawing...');
        const transactionResponse = await fundMeContract.withdraw({
          gasLimit: 5000000,
        });
        await listenForTransactionMine(transactionResponse, provider);
        console.log('The withdraw is successful');
      } catch (error) {
        console.log('Error is', error);
      }
    } else {
      console.log('Connect to metamask first');
    }
  }

  function listenForTransactionMine(transactionResponse, provider) {
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

  async function balanace() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signerAcc = provider.getSigner();
    const fundMeContract = new ethers.Contract(contractAddress, abi, signerAcc);

    console.log('Contract Address:', fundMeContract.address);
    // (await signerAcc.getAddress()).toString() gives the address in string
    console.log('Signer account:', (await signerAcc.getAddress()).toString());

    try {
      const balanace = await provider.getBalance(fundMeContract.address);
      console.log('Contract Balance', ethers.utils.formatEther(balanace));
      //getAdress gives the address of the signer
      const accountBalance = await provider.getBalance(signerAcc.getAddress());
      console.log('account balance', ethers.utils.formatEther(accountBalance));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={withdraw}> Withdraw</button>
      <button onClick={balanace}>Balance</button>
    </>
  );
}
