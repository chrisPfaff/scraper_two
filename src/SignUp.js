import "./styles/sign-up.scss";
import { useState } from "react";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.closeModal(false);
    props.userCreate(false);
    fetch(`http://127.0.0.1:3000/signup`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
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
      <div className="sign-up">
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  };
  return render();
}
