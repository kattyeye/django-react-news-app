import { withRouter } from "react-router";

function ProfilePage(props) {
  return (
    <div className="container">
      <div></div>
      <div>
        <h3>{props.profile}</h3>
      </div>
    </div>
  );
}

export default ProfilePage;
