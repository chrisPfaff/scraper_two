import { useState } from "react";
import Results from "./Results";
import { ImageResults } from "./ImageResults";
import { SpinnerDiamond } from "spinners-react";
import "./styles/search.scss";

export default function Search() {
  const [search, setSearch] = useState("");
  const [element, setElement] = useState("");
  const [results, setResults] = useState([]);
  const [imageResults, setImageResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(false);

  const searchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const searchDom = (e) => {
    e.preventDefault();
    clearState();
    setLoading(true);
    fetch(
      `http://127.0.0.1:3000/search?webpage=${search}&element=${element}`
    ).then((res) => {
      res.json().then(({ data }) => {
        if (element === "img-src") {
          setImageResults(data);
          setLoading(false);
        } else {
          setResults(data);
          setLoading(false);
        }
      });
    });
  };
  const getElements = (e) => {
    e.preventDefault();
    setElement(e.target.value);
  };

  const clearState = () => {
    setImageResults([]);
    setResults([]);
  };

  const saveResults = () => {};

  return (
    <div>
      <div className="search-box">
        <div className="element-picker">
          <label htmlFor="select">Pick an HTML Element</label>
          <select id="select" onChange={getElements} value={element}>
            <option value="select">Select</option>
            <option value="div">Div</option>
            <option value="section">Section</option>
            <option value="article">Article</option>
            <option value="img">Img Src</option>
            <option value="img-src">Image</option>
            <option value="a">A</option>
            <option value="href">Href</option>
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
          <label for="url">Enter a URL</label>
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
        <div className="save-checkbox">
          <label htmlFor="save">Save Results</label>
          <input
            className="checkbox"
            type="checkbox"
            id="save"
            onChange={saveResults}
          />
        </div>
        <input onClick={searchDom} type="submit" value="Get DOM Elements" />
      </div>
      {loading && (
        <div className="spinner-box">
          <SpinnerDiamond
            size={90}
            thickness={180}
            speed={68}
            color="white"
            secondaryColor="rgba(9, 31, 32, 1)"
          />
        </div>
      )}
      {imageResults.length > 0 && <ImageResults results={imageResults} />}
      {results.length > 0 && <Results results={results} />}
    </div>
  );
}
