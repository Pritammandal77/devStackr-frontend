import React from 'react';

function Hamburger() {
  return (
    <div className='w-full h-full'>
      <ul>
        <li>
          <i class="fa-solid fa-xmark"></i>
        </li>
        <li>
          <ul>
            <li>
              <i class="fa-solid fa-message"></i>
              Messages
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Hamburger;
