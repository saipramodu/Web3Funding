import dummyTransactions from './0_dummyTransactions';

export default function Transactions() {
  const Transactions = dummyTransactions.reverse().map((items) => {
    return (
      // Here we can design the transaction card - this is for one card
      // Level 0 for the card
      <div
        key={items.id}
        className='flex-none text-white text-base 
                    bg-[#181918] p-3 rounded-md hover:shadow-2xl hover:bg-[#515357] cursor-pointer m-3 w-90'
      >
        {/* 2xl:min-w-[450px] 2xl:max-[700px] sm:min-w-[270px] sm:max-w-[500px] */}
        <p className='flex-none'>
          From: <span className='text-vsm'>{items.addressFrom}</span>
        </p>
        <p>
          To: <span className='text-vsm'>{items.addressTo}</span>
        </p>
        <p>
          Amount: <span className='text-vsm'>{items.amount}</span>
        </p>
        {items.message && <p>Message:</p>}
      </div>
    );
  });

  //First I'm looking at how the design is and deciding the dic structure
  return (
    // Level 0 for ovreall div
    <div className='flex flex-col justify-center items-center px-20 gradient-bg-transactions'>
      {/* Level 1 for two components - latest transactions and cards */}
      {/* Level 1 - Latest transactions */}
      <div className='md:p-12 py-12 px-4'>
        <h3 className='text-white text-3xl my-2'>Latest Transactions</h3>
      </div>
      {/* Level 1 - Cards */}
      <div className='flex flex-wrap justify-center items-center'>
        {Transactions}
      </div>
    </div>
  );
}
