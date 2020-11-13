import React from 'react';
import './searchModule.css';

export const SearchModule = (props) => {

  let className = 'searchBar';
  if(props.isVisible) {
    className += ' click';
  }else{
    className = 'searchBar';
  }

  return(

    <div class="searchModule">

      <input className={className} placeholder="Search" type="search" onChange={props.onChange}></input>

    </div>
  );
}

export default SearchModule;
