import { useState } from "react";

export default function SearchPanel({ searchEmojis }) {
  const [text, setText] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    console.log(text);
    searchEmojis(text);
  }


  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search Emoji"
        onChange={(event) => {
          
          setText(event.target.value);
          console.log(text);
          if (event.target.value === "") {
            searchEmojis(text);
          }
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
}
