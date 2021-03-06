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
    if ("DRA") {
      props.history.push("/articles/drafts");
    } else {
      props.history.push("/");
    }
  }

  // if (!props.isAuth) {
  //   props.history.push("/login");
  // }

  return (
    <div className="container-fluid" style={{ display: "flex" }}>
      <form className="mt-5 container-fluid" style={{ width: "70%" }}>
        <label className="article-form-label">Submit an Article</label>
        <p className="hear">we want to hear about it.</p>
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
        {article.image && (
          <img src={preview} alt="" className="preview-image" />
        )}
        <button
          type="button"
          className="btn btn-save mt-3"
          name="DRA"
          value="DRA"
          onClick={handleSubmit}
        >
          Save as Draft
        </button>
        <button
          type="button"
          className="btn btn-pub mt-3"
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
