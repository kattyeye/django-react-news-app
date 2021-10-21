import { useState } from "react";
import Cookies from "js-cookie";

export default function ArticleForm(props) {
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
    formData.append("body", article.body);
    formData.append("image", article.image); // constructing key value pairs

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/articles/drafts/", options).catch(
      handleError
    );
    if (!response) {
      console.log(response);
    } else {
      const data = await response.json();
      setArticle(data);
    }
    props.history.push("/drafts");
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-5 col-8">
        <input
          onChange={handleChange}
          value={article.title}
          className="form-control"
          name="title"
          type="text"
          placeholder="Title here."
        />
        {/* <input
          onChange={handleChange}
          value={article.author}
          name="author"
          type="text"
        /> */}
        <textarea
          onChange={handleChange}
          value={article.body}
          className="form-control"
          name="body"
          type="text"
          placeholder="Body text here."
        />

        <input onChange={handleImage} type="file" className="form-control" />
        {article.image && <img src={preview} alt="" />}
        <button type="submit" className="btn btn-warning mt-3">
          Save as Draft
        </button>
      </form>
    </div>
  );
}
