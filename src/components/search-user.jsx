import { React } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchUser = (props) => {
  return (
    <div>
      {/* {<FaSearch/>} */}
      <input
        className="search"
        type="text"
        placeholder="Search" 
        onChange={(e) => props.fsetSearch(e.target.value)}
        
        
        
      />
      
    </div>
  );
};
