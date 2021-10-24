import { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

export default function RegistrationForm(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  let history = useHistory;
  const [error, setError] = useState(null);

  function handleInput(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleError(err) {
    console.warn(err);
  }

  //   const handleSubmit = (event) => {};
  async function handleSubmit(event) {
    event.preventDefault();
    if (user.password1 !== user.password2) {
      setError("Passwords do not match!");
    } else {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify(user),
      };

      const response = await fetch("/rest-auth/registration/", options).catch(
        handleError
      );
      if (!response) {
        console.log(response);
      } else {
        const data = await response.json();
        Cookies.set("Authorization", `Token${data.key}`);
        history.push("/");
      }
    }
  }
  return (
    <div className="container">
      <form className="mt-3 col-6 " onSubmit={handleSubmit}>
        <div className="form-group text-left mb-3 ">
          <label htmlFor="username">username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="enter username."
            onChange={handleInput}
            required
            name="username"
            value={user.username}
          />
        </div>
        <div className="form-group text-left mb-3">
          <label htmlFor="email">email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="enter email."
            onChange={handleInput}
            required
            name="email"
            value={user.email}
          />
        </div>
        <div className="form-group text-left mb-3">
          <label htmlFor="password1">password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            placeholder="enter password."
            onChange={handleInput}
            required
            name="password1"
            value={user.password1}
          />
        </div>
        <div className="form-group text-left mb-3">
          <label htmlFor="password2">confirm password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            placeholder="confirm password."
            onChange={handleInput}
            required
            name="password2"
            value={user.password2}
          />
          {error && <span className="text-danger">{error}</span>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </div>
  );
}
