import Search from "./Search";
import Results from "./Results";
import "./styles/app.scss";

export default function MyApp() {
  return (
    <div>
      <div className="container">
        <h1 className="h1-heading">Scraper Two</h1>
        <Search />
        <Results />
      </div>
    </div>
  );
}
