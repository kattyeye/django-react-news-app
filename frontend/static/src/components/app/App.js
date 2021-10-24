import "./App.css";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import ProfileForm from "../profile-form/ProfileForm";
import ArticleList from "../articles/ArticleList";
import ArticleForm from "../articles/ArticleForm";
import RegistrationForm from "../registration/RegistrationForm";
import { useState, useEffect } from "react";
import LoginForm from "../login/LoginForm";
import SecondaryHeader from "../header/SecondaryHeader";
import ProfilePage from "../profile-form/ProfilePage";
import Admin from "../articles/Admin";
import ArticleListAuth from "../articles/ArticleListAuth";
import PrimaryHeader from "../header/PrimaryHeader";
import Cookies from "js-cookie";
import ArticleListAdmin from "../articles/ArticleListAdmin";
import PrivateRoute from "../privateroute/PrivateRoute";
function App(props) {
  const [isAuth, setIsAuth] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/rest-auth/user");
      if (!response.ok) {
        setIsAuth(false);
        // history.push("/login");
      } else {
        setIsAuth(true);
        // history.push("/account");
      }
    };
    checkAuth();
  }, [history]);

  async function handleLogoutSubmit(event) {
    // event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(props.user),
    };
    const response = await fetch("/rest-auth/logout/", options);
    if (!response) {
      console.log(response);
    } else {
      console.log(response);
      const data = await response.json();
      Cookies.remove("Authorization");
      setIsAuth(false);
      history.push("/login");
    }
  }
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
      <SecondaryHeader handleLogoutSubmit={handleLogoutSubmit} />
      <PrimaryHeader />
      <Switch>
        <Route path="/registration">
          <RegistrationForm />
        </Route>
        <Route path="/login">
          <LoginForm isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>
        <Route path="/account">
          {/* <ProfileForm /> */}
          <ArticleForm history={history} isAuth={isAuth} />
          <ProfilePage isAuth={isAuth} />
          <Admin isAuth={isAuth} handleLogoutSubmit={handleLogoutSubmit} />
        </Route>
        <Route path="/articles/:phase?/:category?">
          <ArticleListAuth
            isAuth={isAuth}
            history={history}
            handleLogoutSubmit={handleLogoutSubmit}
          />
        </Route>
        <Route path="/articles/published/:category?">
          <ArticleList />
        </Route>
        <Route path="/">
          <ArticleList />
        </Route>

        <Route path="/articles/admin">
          <ArticleListAdmin />
        </Route>
      </Switch>
    </>
  );
}

export default App;
