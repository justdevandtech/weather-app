import React from 'react';
import { InputGroup, FormControl } from "react-bootstrap";	

export const SearchBar = () => {
  const [searchBarInput, setSearchBarInput] = React.useState("");

   const handleSearchBarInput = () => {
    console.log(searchBarInput);
    localStorage.setItem("searchBarInput", searchBarInput);
    setSearchBarInput("");
    window.location.reload();	
    
  }; 
  return (
    <>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder="Search for a city"
          aria-label="Recipient's username"
          aria-describedby='basic-addon2'
          value={searchBarInput}
          onChange={e => setSearchBarInput(e.target.value)}
        />
        <InputGroup.Text
          id='basic-addon2'
          style={{ cursor: "pointer" }}
          onClick={handleSearchBarInput}
        >
          Search Here
        </InputGroup.Text>
      </InputGroup>
    </>
  );
};
