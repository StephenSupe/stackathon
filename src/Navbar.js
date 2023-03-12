import React from 'react';

export function Navbar() {
  return (
    <nav>
      <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', listStyle: 'none', color: 'white'}}>
      <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  )
}

