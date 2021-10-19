import "./App.css";
import CustomUser from "../custom-user/CustomUser";
import ArticleList from "../articles/ArticleList";
import ArticleForm from "../articles/ArticleForm";
import RegistrationForm from "../registration/RegistrationForm";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LoginForm from "../login/LoginForm";

function App() {
  const [state, setState] = useState({
    isAuth: null,
    selection: null,
  });
  useEffect(() => {
    const isAuth = Cookies.get("Authorization");
    if (!!isAuth) {
      setState({
        isAuth: true,
        selection: "profile",
      });
    } else {
      setState({
        isAuth: false,
        selection: "login",
      });
    }
  }, []);

  let html;
  if (state.selection === "login") {
    html = <LoginForm setState={setState} />;
  } else if (state.selection === "register") {
    html = <RegistrationForm setState={setState} />;
  } else if (state.selection === "profile") {
    html = <CustomUser />;
  } else if (state.selection === "postnews") {
    html = <ArticleForm />;
  }
  return (
    <div className="articleapp">
      <nav>
        <ul>
          <li>
            <button type="button">Current News</button>
          </li>
          <li>
            <button type="button">Some News</button>
          </li>
          <li>
            <button type="button">Global News</button>
          </li>
          <li>
            <button type="logbutton">Logout</button>
          </li>
        </ul>
      </nav>
      <header className="titleofpage">
        <h2>The Debra Chronicles</h2>
      </header>
      {html}
      <ArticleList />
    </div>
  );
}

export default App;
