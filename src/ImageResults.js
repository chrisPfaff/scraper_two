import "./styles/results.scss";

export function ImageResults(data) {
  data = data.results;
  const render = () => {
    if (data !== undefined) {
      return (
        <div className="image-results">
          <h2>Images</h2>
          <div className="image-holder">
            {data.map((result) => {
              return <img src={result} alt="result" />;
            })}
          </div>
        </div>
      );
    }
  };
  return render();
}
