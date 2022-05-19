import { useState } from "react";
import Results from "./Results";

export default function Search() {
  const [search, setSearch] = useState("");
  const [element, setElement] = useState("");
  const [results, setResults] = useState([]);

  const searchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const searchDom = (e) => {
    e.preventDefault();
    fetch(
      `http://127.0.0.1:3000/hello?webpage=${search}&element=${element}`
    ).then((res) => {
      res.json().then((el) => {
        console.log(el);
      });
    });
  };
  const getElements = (e) => {
    e.preventDefault();
    setElement(e.target.value);
  };
  return (
    <div>
      <div className="search-box">
        <label for="select">Pick an HTML Element</label>
        <select id="select" onChange={getElements} value={element}>
          <option value="select">Select</option>
          <option value="div">Div</option>
          <option value="p">P</option>
        </select>
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
