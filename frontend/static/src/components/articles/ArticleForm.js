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
    formData.append("phase", event.target.value);

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    const response = await fetch("/api_v1/articles/", options).catch(
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
      <form className="mt-5 col-8">
        <label>Submit an Article</label>
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
        <button
          type="button"
          className="btn btn-warning mt-3"
          name="DRA"
          value="DRA"
          onClick={handleSubmit}
        >
          Save as Draft
        </button>
        <button
          type="button"
          className="btn btn-success mt-3"
          name="DRA"
          value="SUB"
          onClick={handleSubmit}
        >
          Submit for Publishing
        </button>
      </form>
    </div>
  );
}
