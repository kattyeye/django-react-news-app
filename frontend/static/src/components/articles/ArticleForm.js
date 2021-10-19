import { useState } from "react";
import Cookies from "js-cookie";

export default function ArticleForm() {
  const [article, setArticle] = useState({
    title: "",
    author: "",
    body: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setArticle({ ...article, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      // setArticle(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleError = (err) => {
    console.warn(err);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("author", article.author);
    formData.append("body", article.body);
    formData.append("image", article.image); // constructing key value pairs

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch("/api_v1/articles/", options).catch(
      handleError
    );
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token${data.key}`);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={article.title}
          name="title"
          type="text"
        />
        <input
          onChange={handleChange}
          value={article.author}
          name="author"
          type="text"
        />
        <input
          onChange={handleChange}
          value={article.body}
          name="bodytext"
          type="text"
        />

        <input onChange={handleImage} type="file" />
        {article.image && <img src={preview} alt="" />}
        <button type="submit" className="btn btn-primary mt-3">
          Submit News
        </button>
      </form>
    </div>
  );
}
