import { React } from "react";

export const SearchUser = (props) => {
  return (
    <input
      type="text"
      placeholder="Search"
      onChange={(e) => props.fsetSearch(e.target.value)}
    />
  );
};
