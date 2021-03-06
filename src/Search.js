import { useState } from "react";
import Results from "./Results";
import { useMachine } from "@xstate/react";
import activeMachine from "../backend/utility/machine/machine";
import { ImageResults } from "./ImageResults";
import { SpinnerDiamond } from "spinners-react";
import "./styles/search.scss";

export default function Search() {
  const [searchItems, setSearchItems] = useState({
    element: "",
    url: "",
  });
  const [results, setResults] = useState([]);
  const [imageResults, setImageResults] = useState([]);
  const [loadingState, setLoadingState] = useMachine(activeMachine);

  const searchDom = (e) => {
    e.preventDefault();
    clearState();
    setLoadingState("TOGGLE");
    fetch(
      `http://127.0.0.1:3000/search?webpage=${searchItems.url}&element=${searchItems.element}`
    ).then((res) => {
      res.json().then(({ data }) => {
        if (searchItems.element === "img-src") {
          setImageResults(data);
          setLoadingState("TOGGLE");
        } else {
          setResults(data);
          setLoadingState("TOGGLE");
        }
      });
    });
  };

  const getElements = (e) => {
    setSearchItems({
      ...searchItems,
      [e.target.name]: e.target.value,
    });
  };

  const clearState = () => {
    setImageResults([]);
    setResults([]);
  };

  return (
    <div>
      <form
        className="search-box"
        onSubmit={(e) => {
          searchDom(e);
        }}
      >
        <div className="element-picker">
          <label htmlFor="select">Pick an HTML Element</label>
          <select
            id="select"
            name="element"
            onChange={(e) => getElements(e)}
            value={searchItems.element}
          >
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
          <label htmlFor="url">Enter a URL</label>
          <input
            onChange={(e) => getElements(e)}
            type="url"
            name="url"
            id="url"
            placeholder="https://example.com"
            pattern="https://.*"
            size="30"
            required
          />
        </div>
        <input type="submit" value="Get DOM Elements" />
      </form>
      {loadingState.value === "active" && (
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
      <div className={"results-holder" + (results.length > 0 ? " active" : "")}>
        {results.length > 0 && <Results results={results} />}
      </div>
    </div>
  );
}
