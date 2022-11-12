import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

export default function Services() {
  const Servicecrad = ({ color, title, icon, subhead }) => {
    return (
      // In this we can design one container of the services card
      // Level 0 - overall
      <div
        className='flex flex-row items-center justify-start p-3 m-2 white-glassmorphism 
                      cursor-pointer hover:shadow-xl'
      >
        {/* Level 1 for icon */}
        <div
          className={`flex justify-center items-center w-10 h-10 rounded-full ${color}`}
        >
          {icon}
        </div>
        {/* Level 1 for text */}
        <div className='flex flex-col flex-1 ml-5'>
          <h3 className='mt-2 text-white text-base'>{title}</h3>
          <p className='mt-1 text-white text-vsm'>{subhead}</p>
        </div>
      </div>
    );
  };

  return (
    // Levl 0 the div for overall component
    <div className='flex w-full justify-center items-center gradient-bg-services'>
      {/* Level 1 for splitting the components */}
      <div className='flex flex-col md:flex-row items-center justify-between md:p-20 py-12 px-4'>
        {/* level  2 is for the headind text*/}
        <div className='flex flex-1 flex-col justify-start items-start'>
          <h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient'>
            Services that we <br />
            Continue to improve
          </h1>
          <p className='text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base'>
            The best choice for buying and selling your crypto assets, with the
            various super friendly services we offer
          </p>
        </div>
        {/* level  2 is for the cards side*/}
        <div className='flex flex-1 flex-col justify-start items-center'>
          <Servicecrad
            color='bg-[#2952E3]'
            title='Security gurantee'
            icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
            subhead='Security is guranteed. We always maintain privacy and maintain the quality of our products'
          />
          <Servicecrad
            color='bg-[#8945f8]'
            title='Best rates'
            icon={<BiSearchAlt fontSize={21} className='text-white' />}
            subhead='Security is guranteed. We always maintain privacy and maintain the quality of our products'
          />
          <Servicecrad
            color='bg-[#F84550]'
            title='Fastest transaction'
            icon={<RiHeart2Fill fontSize={21} className='text-white' />}
            subhead='Security is guranteed. We always maintain privacy and maintain the quality of our products'
          />
        </div>
      </div>
    </div>
  );
}

/*
Tailwind: 

Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size:

Flex-col - one below another (one col) flex-row - one after another (one row)

for me whta is good to follow is flex flex-col/row padding, margin extra styles cursor or hover

*/
