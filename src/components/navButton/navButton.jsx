import React from 'react';
import './navButton.css';

export const NavButton = (props) => {
  return (

    <a href="#">
    <div className="navButton" onClick={props.onClick}>

      {props.text}

    </div>
    </a>
  );
}

export default NavButton;
