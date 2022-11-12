import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../images/logo.png';
import { useContext, useState } from 'react';
// import { ethers } from 'ethers';
// // import { AppContext } from './0_TransactionsContext';
// import { contractAddress } from './Transactions.json';
// import { abi } from './Transactions.json';
import getItems from './0_getTransactionItems';

export default function NavBar() {
  // The context api did not work with vite - I created one default function to be used in all places
  // const { TransactionContract } = useContext(AppContext);

  const { provider, signer, TransactionContract } = getItems();

  // console.log(provider, signer);
  // console.log(TransactionContract);
  //We can create a toggle menu to see if we areon mobile or not
  const [toggleMenu, setToggleMenu] = useState(false);
  const list = ['Market', 'Exchange', 'Tutorials', 'Wallets'];
  //Index is the index of the mapping array - we can use it to create the unique key
  const mapList = list.map((item, index) => {
    // console.log(index);
    return (
      <ul
        // What below style means is that md: flex - we will display if the size is medium or else hidden
        className='text-white md:flex hidden list-none flex-row 
    justify-between items-center flex-initial cursor-pointer mx-4'
        key={index}
      >
        {item}
      </ul>
    );
  });

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        {/* <img src={logo} className='w-32 cursor-pointer'></img> */}
        <h3 className='flex-initial text-xl font-semibold cursor-pointer logo-gradient'>
          The Crypt Exchange
        </h3>
      </div>
      <>{mapList}</>
      <ul
        className=' text-white bg-[#2952e3] py-2 px-7 mx-4 rounded-full 
              cursor-pointer hover:bg-[#2546bd]'
      >
        Login
      </ul>
      {/* Now setting the ham icon and close */}
      <div className='flex relative'>
        {/* If tohhle is off - the ham will display */}
        {!toggleMenu ? (
          <HiMenuAlt4
            className='text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(true)}
          />
        ) : (
          <AiOutlineClose
            className='text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className='z-10 fixed -top-0 -right-2 p-3 w-[50vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
          >
            <li className='text-xl w-full my-2'>
              <AiOutlineClose
                className='cursor-pointer'
                onClick={() => setToggleMenu(false)}
              />
            </li>
            <li className='my-2 mx-4 text-lg cursor-pointer items-center '>
              Market
            </li>
            <li className='my-2 mx-4 text-lg cursor-pointer'>Exchange</li>
            <li className='my-2 mx-4 text-lg cursor-pointer'>Tutorials</li>
            <li className='my-2 mx-4 text-lg cursor-pointer'>Wallets</li>
          </ul>
        )}
      </div>
    </nav>
  );
}

// function getItems() {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const TransactionContract = new ethers.Contract(contractAddress, abi, signer);
//   const variable = 4;
//   return { provider, signer, TransactionContract, variable };
// }

/*
Tailwind: refer to tailwind documentation for the commands - the styles in index.css are custom styles copied
use https://tailwindcss.com/docs/justify-items#stretch to refer
Tailwind intellisense is installed in VS code - so the auto complete will run

md - medium devices

*/
