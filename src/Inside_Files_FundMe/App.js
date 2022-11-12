import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import FundButton from './FundButton';
import Withdraw from './Withdraw';

export default function App() {
  //First we need to check if the ethereum metamask plugin is installed in the browser
  // Refer https://docs.metamask.io/guide/ethereum-provider.html#properties metamask docs to learn more about the metamask connection
  // MetaMask injects a global API into websites visited by its users at window.ethereum
  const [connection, setConnection] = useState('');

  async function Connect() {
    // we can use detectEthereumProvider to check if metamask is installed
    const provider = await detectEthereumProvider();

    //One way to use if else statement
    // provider
    //   ? () => {
    //       console.log('Pass');
    //     }
    //   : console.log('Fail');

    if (provider) {
      //seeing what is window.ethereum and provider
      // console.log(window.ethereum);
      console.log(provider);

      setConnection('Loading the connection....');
      //Any time we are making request to metamask - we are making an API call
      // API call structure is window.ethereum.request({method: of type string}). then(). catch()
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          //we can use getElementby ID as below - instead we can use the useState hook
          // document.getElementById('connection').innerHTML =
          //   'Great the connection is made...';
          setConnection('Great the connection is made...');
        })
        .catch((e) => {
          console.log('Error is', e);
          // document.getElementById('connection').innerHTML =
          //   'Connection not made - there is an error';
          setConnection('Connection not made - there is an error');
        });
    } else {
      // document.getElementById('connection').innerHTML =
      //   'Install the metamask...';
      setConnection('Install the metamask...');
    }
    console.log('The provider address is', provider);
  }
  return (
    <div>
      <p>Blockchain Front End</p>
      <button id='connectButton' onClick={Connect}>
        Connect
      </button>
      <h4 id='connection'>{connection}</h4>
      {/* I'm using Fund file to keep this file short */}
      <FundButton />
      <Withdraw />
    </div>
  );
}
