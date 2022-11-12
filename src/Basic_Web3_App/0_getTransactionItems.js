import { ethers } from 'ethers';
import { contractAddress } from './Transactions.json';
import { abi } from './Transactions.json';

export default function getItems() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const TransactionContract = new ethers.Contract(contractAddress, abi, signer);
  // console.log(provider, signer, TransactionContract);
  return { provider, signer, TransactionContract };
}
