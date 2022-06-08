import "./styles/results.scss";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
        console.log(item);
      });
    });
    // res.json().then((item) => {
    //   console.log(item);
    //   //localStorage.setItem("token", token);
    // });
    //});
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  };
  return render();
}
