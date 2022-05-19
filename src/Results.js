export default function Results(data) {
  data = data.results;
  const render = () => {
    if (data !== undefined) {
      return data.map((result) => {
        return (
          <div className="result">
            <p>{result}</p>
          </div>
        );
      });
    }
  };
  return (
    <div className="results">
      <h2>Results</h2>
      {render()}
    </div>
  );
}
