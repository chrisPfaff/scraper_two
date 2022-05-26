export function ImageResults(data) {
  data = data.results;
  const render = () => {
    if (data !== undefined) {
      return (
        <div className="results">
          <h2>Results</h2>
          {data.map((result) => {
            return <img src={result} alt="result" />;
          })}
        </div>
      );
    }
  };
  return render();
}
