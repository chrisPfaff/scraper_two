import "./styles/sign-up.scss";
import { useState } from "react";

export default function SignUp(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.closeModal(false);
    props.userCreate(false);
    fetch(`http://127.0.0.1:3000/signup`, {
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
        console.log(item.token);
        localStorage.setItem("token", item.token);
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
      <div className="sign-up">
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  };
  return render();
}
