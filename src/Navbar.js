import React from 'react';

export function Navbar() {
  return (
    <nav>
      <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', listStyle: 'none', color: 'white'}}>
        <li><a href="#">Skills</a></li>
        <li><a href="#">Portfolio</a></li>
        <li><a href="#">About Me</a></li>
   

      </ul>
    </nav>
  )
}

