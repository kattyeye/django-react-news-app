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
import Footer from "../footer/Footer";
function App(props) {
  // const [isAuth, setIsAuth] = useState(null);
  // const [isAdmin, setIsAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/rest-auth/user");
      if (!response.ok) {
        setUser({ isAuth: false });
      } else {
        const data = await response.json();
        setUser({ isAuth: true, isAdmin: data.is_staff });
      }
    };
    checkAuth();
  }, [history]);

  // useEffect(() => {
  //   const checkAdminStatus = async () => {
  //     const response = await fetch("/rest-auth/user");
  //     if (!response.ok) {
  //       setIsAdmin(false);
  //     } else if (response.is_staff == true) {
  //       setIsAdmin(true);
  //     } else {
  //     }
  //   };
  //   checkAdminStatus();
  // }, [history]);

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
      setUser({ isAuth: false });
      history.push("/login");
    }
  }

  const isAuth = user?.isAuth;
  const isAdmin = user?.isAdmin;

  return (
    <>
      <SecondaryHeader
        handleLogoutSubmit={handleLogoutSubmit}
        isAuth={isAuth}
        isAdmin={isAdmin}
      />
      <PrimaryHeader />
      <Switch>
        <Route path="/registration">
          <RegistrationForm />
        </Route>
        <Route path="/login">
          <LoginForm isAuth={isAuth} setUser={setUser} />
        </Route>
        <Route path="/account">
          {/* <ProfileForm /> */}
          <ArticleForm history={history} isAuth={isAuth} />
          <ProfilePage isAuth={isAuth} />
        </Route>
        <Route path="/articles/:phase?">
          <ArticleListAuth
            isAuth={isAuth}
            history={history}
            handleLogoutSubmit={handleLogoutSubmit}
          />
        </Route>
        <Route path="/admin">
          <ArticleListAdmin isAuth={isAuth} isAdmin={isAdmin} />
        </Route>
      </Switch>
      {/* <Route path="/">
          <ArticleList />
        </Route> */}
      <Route path="/:category?">
        <ArticleList />
      </Route>

      <Footer />
    </>
  );
}

export default App;
