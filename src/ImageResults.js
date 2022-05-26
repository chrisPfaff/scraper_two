export function ImageResults(data) {
  data = data.results;
  const render = () => {
    if (data !== undefined) {
      return (
        <div className="image-results">
          <h2>Images</h2>
          {data.map((result) => {
            return <img src={result} alt="result" />;
          })}
        </div>
      );
    }
  };
  return render();
}
