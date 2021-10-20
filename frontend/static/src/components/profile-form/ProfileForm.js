import { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProfileForm(props) {
  const [profile, setProfile] = useState({
    alias: "",
    avatar: null,
  });
  const [preview, setPreview] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProfile({ ...profile, avatar: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    console.log("profile", profile);
    formData.append("alias", profile.alias);
    formData.append("avatar", profile.avatar); // constructing key value pairs

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/account/", options);
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      setProfile(data);
      props.history.push("/");
    }
  }

  // if (profile) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="form-group text-left mb-3">
      <form onSubmit={handleSubmit} className="mt-3 col-6">
        <input
          type="text"
          name="alias"
          value={profile.alias}
          onChange={handleChange}
          className="form-control"
        />
        <input
          type="file"
          name="avatar"
          onChange={handleImage}
          className="form-control"
        />
        {profile.avatar && <img src={preview} alt="" />}
        <button className="btn btn-success" type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}
