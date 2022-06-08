import "./styles/results.scss";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/signup?user=${username}`).then((res) => {
      res.json().then(({ token }) => {
        localStorage.setItem("token", token);
      });
    });
  };


const handleUsername = (e) => {
  console.log(username);
  setUsername(e.target.value);
};

const render = () => {
  return (
    <div className="sign-up">
      <form onSubmit={(e) => handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => handleUsername(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
