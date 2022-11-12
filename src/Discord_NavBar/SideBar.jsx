// We can import the icons we need

import { BsPlus, BsGearFill, BsFillLightningFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';

export default function SideBar() {
  //We can have function for icons
  function SideBarIcons({ icon }) {
    return (
      <div className='sidebar-icon'>
        {icon}

        <span className='sidebar-tooltip'>tool tip 💡💡</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col fixed top-0 bg-primary h-screen w-16 text-white shadow-lg'>
      <SideBarIcons icon={<BsPlus size='40' />} />
      <SideBarIcons icon={<BsGearFill size='30' />} />
      <SideBarIcons icon={<BsFillLightningFill size='30' />} />
      <SideBarIcons icon={<FaFire size='30' />} />
      <SideBarIcons icon={<FaPoo size='30' />} />
    </div>
  );
}

/* Tailwind

top - set the horizontal or vertical position of a positioned element.

we extended the tailwind config with below - so we tailwind will give these primary and secondary now
  extend: {
      colors: {
        primary: '#202225',
        secondary: '#5865f2',
      },

*/
