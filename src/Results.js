export default function Results(data) {
  data = data.results;
  console.log(data);
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
