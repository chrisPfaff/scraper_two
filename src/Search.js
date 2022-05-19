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
      res.json().then((element) => {
        console.log(element.data);
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
          <option value="section">Section</option>
          <option value="article">Article</option>
          <option value="a">A</option>
          <option value="p">P</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="h6">H6</option>
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
