import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import Loader from './Loader';
import { useEffect, useState } from 'react';
import getItems from './0_getTransactionItems';
import { ethers } from 'ethers';

export default function Welcome() {
  const commonStyle =
    'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] boredr-gray-400 text-sm font-light text-white';

  const [account, setAccount] = useState('Wallet Address');
  const [loading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );
  const { TransactionContract } = getItems();

  // What we are trying is to assign the typed value in the send now fields to these values
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  });

  //Send now for eth transaction
  async function sendNowclick() {
    const { addressTo, amount, keyword, message } = formData;

    //If any of the values are not entered, we will not execute this function
    if (!addressTo || !amount || !keyword || !message)
      return alert('Enter all required fields...');

    const parsedAmount = await ethers.utils.parseEther(amount);

    //Now we can send eth to other accounts
    try {
      // I'm using an alternate syntax  - instead of if else
      if (!window.ethereum) return alert('Please Install Metamask');
      if (account == 'Wallet Address' || !account)
        return alert('Click on connect button once');

      // As you see, we can send eth from one acc to another without even the use of a contract
      // in ethereum.request - we do not interact with the contract, we need to use contract to store the transaction
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: account.toString(),
            to: addressTo.toString(),
            //The gas needs to be in hexadecimal and in gewi units
            gas: '0x5208', // 2100 GWEI
            value: parsedAmount._hex.toString(), //This will now be in Hex
          },
        ],
      });

      //Now we can store the transaction to the blockchain using Transactions contract addToBlockchain()
      const transactionResponse = await TransactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      //we can set some loading till completed
      setLoading(true);
      console.log(
        'Transaction in process with hash...',
        transactionResponse.hash
      );
      await transactionResponse.wait(1);
      setLoading(false);
      console.log('Sucess...with hash: ', transactionResponse.hash);

      const transactionCount = await TransactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
    }
  }

  // This is for connecting to the wallet
  async function connectWallet() {
    if (window.ethereum !== 'undefined') {
      try {
        // Note the eth_requestAccounts here - this will request for connection to the accounts
        if (account == 'Wallet Address') {
          const requestAccounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          setAccount(
            await window.ethereum.request({
              method: 'eth_accounts',
            })
          );
        } else {
          return alert('An account is already connected');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return alert('Please install metamask');
    }
  }

  // Here e is the event - event is the change made
  const handleChange = (e, name) => {
    // console.log(e.target.value);
    setFormData((prevSate) => ({
      ...prevSate,
      [name]: e.target.value,
    }));
    // console.log('The form object', formData);
  };

  //The input function component with props received
  function InputFunction({ placeholder, type, name, handleChange, valueProp }) {
    return (
      <input
        placeholder={placeholder}
        step='0.0001'
        type={type}
        value={valueProp}
        className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none 
                   text-sm white-glassmorphism'
        // Onchnage will call the function when ever change is made in the input box
        onChange={(e) => {
          handleChange(e, name);
        }}
      ></input>
    );
  }

  return (
    <div className='flex w-full justify-center items-center flex-col md:flex-row'>
      <div
        className='flex md:flex-row flex-col items-start justify-center ml-[5%]
                   md:p-20 py-12'
      >
        <div className='flex flex-1 justify-center items-start flex-col'>
          <h1 className='text-3xl sm:text-4xl text-white text-gradient'>
            Send Crypto <br /> across the world
          </h1>
          <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12'>
            Explore the cypto spacce. Buy and sell crypto right here...
          </p>
          <button
            type='button'
            className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full
                        cursor-pointer hover:bg-[#2546bd] w-full'
            onClick={connectWallet}
          >
            <p className='text-white text-base font-semibold'>Connect Wallet</p>
          </button>
          {/* Now we can create a grid */}
          <div className='grid sm:gris-cols-3 grid-cols-3 w-full mt-10'>
            <div className={`rounded-tl-2xl ${commonStyle}`}>Reliability</div>
            <div className={`${commonStyle} `}>Security</div>
            <div className={`${commonStyle} rounded-tr-2xl`}>Ethereum</div>
            <div className={`${commonStyle} rounded-bl-2xl`}>Web 3.0</div>
            <div className={`${commonStyle} `}>Low Fee</div>
            <div className={`${commonStyle} rounded-br-2xl`}>Blockchain</div>
          </div>
        </div>
      </div>
      {/* 1st overall div for card and details entry*/}
      <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
        {/* 2nd level - card div */}
        <div
          className='eth-sai-card white-glassmorphism flex justify-end items-start 
                        flex-col rounded-xl h-40 sm:w-72 w-[60%] my-5 p-3'
        >
          {/* 3rd level - Div for items inside the card */}

          <div className='flex justify-between flex-col w-full h-full'>
            {/* 4th level- Div for the icons and text */}

            <div className='flex justify-between items-start'>
              {/* 5th level to create a circle around the eth icon */}

              <div className='flex w-10 h-10 rounded-full border-white border-2 justify-center items-center'>
                <SiEthereum fontSize={21} color='#fff' />
              </div>
              <BsInfoCircle fontSize={17} color='#fff' />
            </div>
            <div className='flex flex-col justify-between'>
              <p className='text-white font-light text-vsm'>{account}</p>
              <p className='text-white font-semibold text-sm'>Ethereum</p>
            </div>
          </div>
        </div>
        {/* Still in 1st overall div for for card and details entry */}
        <div className='flex flex-col justify-start items-center blue-glassmorphism p-5 sm:w-96 w-full'>
          {/* Instead of creating input directly we are using a input function component */}
          {/* The props are passed from here */}
          <InputFunction
            placeholder='Adress to'
            type='text'
            name='addressTo'
            valueProp={formData.addressTo}
            handleChange={handleChange}
          />
          <InputFunction
            placeholder='Amount (ETH)'
            type='number'
            name='amount'
            valueProp={formData.amount}
            handleChange={handleChange}
          />
          <InputFunction
            placeholder='Keyword (GIF)'
            type='text'
            name='keyword'
            valueProp={formData.keyword}
            handleChange={handleChange}
          />
          <InputFunction
            placeholder='Enter any message'
            type='text'
            name='message'
            valueProp={formData.message}
            handleChange={handleChange}
          />
          {/* Loading button */}
          {loading ? (
            <Loader />
          ) : (
            <button
              type='button'
              className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] 
                        hover:bg-[#3d4f7c] rounded-full '
              onClick={sendNowclick}
            >
              Send Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* Tailwind

Items -center aligns center vertically, justify -center aligns horizontally

flex- row aligns the items horizontally 
items- start strats from vertical top 

sm: small devices

mt-margin top

eth-card - custom style

*/
