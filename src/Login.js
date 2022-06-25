import "./styles/login.scss";
import { useState } from "react";

export default function Login(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:3000/login`, {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((item) => {
        console.log(item.user);
        if (item.user === true) {
          props.closeModal(false);
          localStorage.setItem("token", item.token);
        }
      });
    });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const render = () => {
    return (
      <div className="login">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Username:</label>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
          />
          <label>Password:</label>
          <input
            placeholder="password"
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
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
