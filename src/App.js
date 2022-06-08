import Search from "./Search";
import Results from "./Results";
import SignUp from "./SignUp";
import "./styles/app.scss";

export default function MyApp() {
  return (
    <main>
      <SignUp />
      <div className="container">
        <h1 className="h1-heading">Scraper Two</h1>
        <Search />
        <Results />
      </div>
    </main>
  );
}
