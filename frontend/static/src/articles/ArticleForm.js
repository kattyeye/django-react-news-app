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

  const handleChange = (event) => {
    const { text, value } = event.target;
    setArticle({ ...article, [text]: value });
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setArticle({ ...article, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setArticle(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("author", article.author);
    formData.append("body", article.body);
    formData.append("image", article.image); // constructing key value pairs

    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };
    fetch("/api_v1/articles/", options);
  };

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
      </form>
    </div>
  );
}
