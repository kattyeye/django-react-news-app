import "./App.css";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import ProfileForm from "../profile-form/ProfileForm";
import ArticleListHome from "../articles/ArticleListHome";
import ArticleForm from "../articles/ArticleForm";
import RegistrationForm from "../registration/RegistrationForm";
import { useState, useEffect } from "react";
import LoginForm from "../login/LoginForm";
import Header from "../header/Header";
import ProfilePage from "../profile-form/ProfilePage";
import Admin from "../articles/Admin";
import ArticleListDrafts from "../articles/ArticleListDrafts";
function App() {
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
      <Header />
      <Switch>
        <Route path="/registration">
          <RegistrationForm />
        </Route>
        <Route path="/login">
          <LoginForm isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>
        <Route path="/account">
          {/* <ProfileForm /> */}
          <ArticleForm history={history} />
          <ProfilePage isAuth={isAuth} />
          <Admin isAuth={isAuth} />
        </Route>
        <Route path="/drafts">
          <ArticleListDrafts isAuth={isAuth} history={history} />
        </Route>
        <Route path="/">
          <ArticleListHome />
        </Route>
      </Switch>
    </>
  );
}

export default App;
