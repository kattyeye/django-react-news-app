import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ isAuth, ...props }) {
  return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
