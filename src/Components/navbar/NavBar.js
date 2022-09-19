import React from 'react';
import './NavBar.css';
const NavBar = () => {
  return (
    <React.Fragment>
      <ul className="nav">
        <li className="li">
          <a href="#home">Note Keeper </a>
        </li>
        <li className="li floatRight">
          <a className="active" href="#about">
            Github link
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default NavBar;
