import { useState } from "react";
import Results from "./Results";

export default function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const searchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const searchDom = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:3000/hello?=webpage${search}`);
    console.log(search);
  };
  return (
    <div>
      <div className="search-box">
        <label for="url">Enter an https://</label>
        <input
          onChange={searchSubmit}
          type="url"
          name="url"
          id="url"
          placeholder="https://example.com"
          pattern="https://.*"
          size="30"
          required
        />
        <input onClick={searchDom} type="submit" value="Get DOM Elements" />
      </div>
      <Results results={results} />
    </div>
  );
}
