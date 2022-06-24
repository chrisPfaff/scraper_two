import "./styles/login.scss";
import { useState } from "react";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.closeModal(false);
    fetch(`http://127.0.0.1:3000/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((item) => {
        console.log(item.token);
        localStorage.setItem("token", item.token);
      });
    });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const render = () => {
    return (
      <div className="login">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Username:</label>
          <input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => handleUsername(e)}
          />
          <label>Password:</label>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => handlePassword(e)}
          />
          <button type="submit">Login</button>
        </form>
        <button
          onClick={(e) => {
            props.userCreate(true);
          }}
        >
          Not a user?
        </button>
      </div>
    );
  };
  return render();
}
