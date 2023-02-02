import React, { useState } from 'react';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-white bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Menu
      </button>
      <div className={`bg-gray-800 p-3 absolute top-0 left-0 ${isOpen ? 'block' : 'hidden'} transform -translate-x-full`}>
        <ul>
            <li className='text-white'>
                one
            </li>
            <li>
                two
            </li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
