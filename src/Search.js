import { useState } from "react";
import Results from "./Results";
import { SpinnerInfinity } from "spinners-react";
import "./styles/search.scss";

export default function Search() {
  const [search, setSearch] = useState("");
  const [element, setElement] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const searchDom = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `http://127.0.0.1:3000/hello?webpage=${search}&element=${element}`
    ).then((res) => {
      res.json().then((element) => {
        console.log(element.data);
        setResults(element.data);
        setLoading(false);
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
        <div className="element-picker">
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
        </div>
        <div className="url-picker">
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
        </div>
        <input onClick={searchDom} type="submit" value="Get DOM Elements" />
      </div>
      {loading && (
        <div className="spinner-box">
          <SpinnerInfinity
            size={74}
            thickness={153}
            speed={68}
            color="rgba(63, 57, 172, 1)"
            secondaryColor="rgba(163, 172, 57, 0.44)"
          />
        </div>
      )}
      {results.length > 0 && <Results results={results} />}
    </div>
  );
}
