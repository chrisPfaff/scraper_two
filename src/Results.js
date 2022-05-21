import "./styles/results.scss";

export default function Results(data) {
  data = data.results;
  const render = () => {
    if (data !== undefined) {
      return (
        <div className="results">
          <h2>Results</h2>
          {data.map((result) => {
            return <p>{result}</p>;
          })}
        </div>
      );
    }
  };
  return render();
}
