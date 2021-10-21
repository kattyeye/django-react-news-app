import "./App.css";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import ProfileForm from "../profile-form/ProfileForm";
import ArticleList from "../articles/ArticleList";
import ArticleForm from "../articles/ArticleForm";
import RegistrationForm from "../registration/RegistrationForm";
import { useState, useEffect } from "react";
import LoginForm from "../login/LoginForm";
import Header from "../header/Header";
import ProfilePage from "../profile-form/ProfilePage";

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/rest-auth/user");
      if (!response.ok) {
        setIsAuth(false);
        history.push("/login");
      } else {
        setIsAuth(true);
        history.push("/account");
      }
    };
    checkAuth();
  }, [history]);

  // let html;
  // if (state.selection === "login") {
  //   html = <LoginForm setState={setState} />;
  // } else if (state.selection === "register") {
  //   html = <RegistrationForm setState={setState} />;
  // } else if (state.selection === "profile") {
  //   html = <CustomUser />;
  // } else if (state.selection === "postnews") {
  //   html = <ArticleForm />;
  // }
  return (
    <>
      {" "}
      {/* <nav>
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
          <button className="logbutton" type="button">
            Logout
          </button>
        </ul>
      </nav>
      <header className="titleofpage">
        <h2>The Debra Chronicles</h2>
      </header> */}
      <Header />
      <Switch>
        <Route path="/registration">
          <RegistrationForm />
        </Route>
        <Route path="/login">
          <LoginForm isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>
        <Route path="/account">
          <ProfileForm />
          <ArticleForm />
          <ProfilePage isAuth={isAuth} />
        </Route>
        <Route path="/">
          <ArticleList isAuth={isAuth} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
