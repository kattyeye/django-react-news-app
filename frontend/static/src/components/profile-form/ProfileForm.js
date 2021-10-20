import { useState } from "react";
import Cookies from "js-cookie";

export default function ProfileForm() {
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
    formData.append("alias", profile.alias);
    formData.append("avatar", profile.avatar); // constructing key value pairs

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ formData }),
    };
    const response = await fetch("/api_v1/account/", options);
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      Cookies.set("Profile", `Token${data.key}`);
    }
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="alias"
          value={profile.alias}
          onChange={handleChange}
        />
        <input type="file" name="avatar" onChange={handleImage} />
        {profile.avatar && <img src={preview} alt="" />}
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
